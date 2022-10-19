import React, {
  Dispatch,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import { isURL, parse } from '../utils/link';
import {
  getContents,
  addLinkContent,
  addNoteContent,
  addImageContent,
} from '../utils/content';
import { useResetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
  termState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
} from '../stores/dashboard';
import { contentsState } from '../stores/content';
import { categoriesState } from '../stores/category';
import useInput from '../hooks/useInput';
import image_icon from '../assets/images/image_icon4.png';
import { useNavigate } from 'react-router-dom';

const Notebox = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, onChangeText, setText] = useInput('');
  const resetTerm = useResetRecoilState(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const contentsSize = useRecoilValue(contentsSizeState);
  const resetPageIdx = useResetRecoilState(pageIdxState);
  const [contents, setContents] = useRecoilState(contentsState);
  const categories = useRecoilValue(categoriesState);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    curCategoryId,
  );
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '42px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    setSelectedCategoryId(curCategoryId);
  }, [curCategoryId]);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '42px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!text.trim()) {
        return;
      }

      setText('');

      if (isURL(text)) {
        const loadingContent = {
          category: { id: null, name: null },
          id: 0,
          url: text,
          linkImg: '',
          title: '',
          text: '',
          type: 'link',
        };
        setContents([loadingContent, ...contents]);

        parse(text).then((body) => {
          body.categoryId = curCategoryId;
          addLinkContent(body).then(() => {
            resetPageIdx();
            resetTerm();
            getContents(contentsSize, curCategoryId).then((res) => {
              setContents([...res]);
            });
          });
        });
      } else {
        const loadingContent = {
          category: { id: null, name: null },
          id: 0,
          text,
          type: 'note',
        };
        setContents([loadingContent, ...contents]);

        const body = {
          text,
          categoryId: selectedCategoryId,
        };
        addNoteContent(body).then((status) => {
          if (!status) {
            navigate('/');
          }
          resetPageIdx();
          resetTerm();
          getContents(contentsSize, curCategoryId).then((res) => {
            setContents([...res]);
          });
        });
      }
      if (ref !== null) {
        ref.current!.style.height = '42px';
      }
    },
    [text, setText, selectedCategoryId, curCategoryId],
  );

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitHandler(e);
        }
      }
    },
    [onSubmitHandler],
  );

  const onSelectCategoryHandler = (e: any) => {
    const temp = e.target.value != 0 ? e.target.value : null;
    setSelectedCategoryId(temp);
    if (buttonRef !== null) {
      buttonRef.current!.focus();
    }
  };

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }

      const formData = new FormData();
      formData.append('imageFile', e.target.files[0]);

      if (selectedCategoryId) {
        const request = {
          categoryId: selectedCategoryId,
        };
        formData.append(
          'request',
          new Blob([JSON.stringify(request)], {
            type: 'application/json',
          }),
        );
      }

      addImageContent(formData).then((res) => {
        if (!res) {
          navigate('/');
        }
      });
    },
    [selectedCategoryId],
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <div className="flex justify-center z-30 ">
      <div
        className={`fixed mx-4 bottom-0 w-11/12 
       lg:w-9/12 sm:m-4 z-30`}
      >
        <div className="w-full rounded-xl outline outline-2 outline-gray-300 ">
          <form
            onSubmit={onSubmitHandler}
            className="w-full rounded-xl bg-white"
          >
            <textarea
              onChange={onChangeText}
              onKeyPress={onKeyDown}
              placeholder="URL 또는 메모 입력"
              value={text}
              rows={1}
              ref={ref}
              onInput={handleResizeHeight}
              className="w-full border-slate-300 border-0 focus:border-slate-300 focus:border-b-0 resize-none outline-0 shadow-none overflow-hidden ring-0 focus:ring-0"
            ></textarea>
            {/* tool area */}
            <div className="flex items-center justify-between relative bg-white h-10 border-0 sm:rounded-b-xl">
              {/* image button */}
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={onUploadImage}
                className="hidden"
              />
              <button
                type="button"
                onClick={onUploadImageButtonClick}
                className="justify-center w-6 h-6 m-2 shrink-0"
                aria-label="이미지 업로드"
              >
                <img src={image_icon} alt="이미지 추가" />
              </button>
              {/* category select */}

              <div className="grow flex overflow-scroll text-center scrollbar-hide">
                {categories.map((item) => {
                  return (
                    <button
                      type="button"
                      className={`whitespace-nowrap align-baseline rounded-xl m-1 py-0.25 px-2 
                        ${
                          (!item.id && !selectedCategoryId) ||
                          item.id == selectedCategoryId
                            ? 'bg-gray-400 text-white'
                            : 'border-gray-400 text-gray-400 border-2'
                        }
                      `}
                      key={item.id ? item.id : 0}
                      onClick={onSelectCategoryHandler}
                      value={item.id ? item.id : 0}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              {/* submit button */}
              <button
                type="submit"
                ref={buttonRef}
                className={
                  text
                    ? `mx-2 p-1.5 mr-2  text-white rounded-full bg-signiture focus:border-none`
                    : ` p-1.5 mr-2 text-white rounded-full bg-gray-400 focus:border-none`
                }
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notebox;
