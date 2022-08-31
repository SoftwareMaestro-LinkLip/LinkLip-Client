import React, {
  Dispatch,
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { isURL, parse } from '../utils/link';
import { getContents, addLinkContent } from '../utils/content';
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
import { ILinkContent } from '../typings/types';

const Notebox = () => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [note, onChangeNote, setNote] = useInput('');
  const resetTerm = useResetRecoilState(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const contentsSize = useRecoilValue(contentsSizeState);
  const resetPageIdx = useResetRecoilState(pageIdxState);
  const [contents, setContents] = useRecoilState(contentsState);
  const categories = useRecoilValue(categoriesState);
  const [selected, setSelected] = useState<number | null>(curCategoryId);

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '42px';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  useEffect(() => {
    setSelected(curCategoryId);
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

      if (isURL(note)) {
        const loadingContent = {
          id: 0,
          url: note,
          linkImg: '',
          title: '',
          text: '',
          categoryId: 0,
        };
        setNote('');
        setContents([loadingContent, ...contents]);

        parse(note).then((body) => {
          body.categoryId = curCategoryId;
          console.log('body', body);
          addLinkContent(body).then(() => {
            resetPageIdx();
            resetTerm();
            getContents(contentsSize, selected).then((res) => {
              setContents([...res]);
            });

            if (ref !== null) {
              ref.current!.style.height = '42px';
            }
          });
        });
      }
    },
    [note, setNote],
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

  const onSelectCategoryHandler = useCallback(
    (e: any) => {
      setSelected(e.target.value != 0 ? e.target.value : null);
    },
    [categories, setSelected, selected],
  );

  return (
    <div className="flex justify-center z-30 ">
      <div
        className={`fixed bottom-0 w-11/12 
       lg:w-9/12 m-4 z-30`}
      >
        <div className="w-full rounded border-solid border-2 border-slate-200">
          <form onSubmit={onSubmitHandler} className="w-full bg-white">
            <textarea
              onChange={onChangeNote}
              onKeyPress={onKeyDown}
              placeholder="Input URL"
              value={note}
              rows={1}
              ref={ref}
              onInput={handleResizeHeight}
              className="w-full border-slate-300 border-0 focus:border-slate-300 focus:border-b-0 rounded-t resize-none outline-0 shadow-none overflow-hidden ring-0 focus:ring-0"
            ></textarea>
            {/* tool area */}
            <div className="flex items-center relative bg-slate-200 h-10 border-0 ">
              {/* image button */}
              <button
                className="justify-center w-6 h-6 m-2 rounded-lg  border-slate-200 text-slate-500"
                aria-haspopup="true"
                aria-label="이미지 추가"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                </svg>
              </button>
              {/* category select */}
              {note && (
                <div className="flex overflow-scroll text-center scrollbar-hide">
                  {categories.map((item) => {
                    return (
                      <button
                        className={`whitespace-nowrap align-baseline rounded-xl m-1 py-0.25 px-2 
                        ${
                          (!item.id && !selected) || item.id == selected
                            ? 'bg-slate-500 text-white'
                            : 'border-slate-500 text-slate-500 border-2'
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
              )}

              {/* submit button */}
              <button
                type="submit"
                className="absolute right-1  p-2 text-slate-500"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Notebox;
