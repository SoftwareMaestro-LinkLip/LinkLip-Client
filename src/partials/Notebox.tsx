import React, { Dispatch, useCallback, useRef, useEffect } from 'react';
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

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = ref.current.scrollHeight + 'px';
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    ref.current.style.height = '38px';
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

        parse(note).then((contentInfo) => {
          const body: ILinkContent = contentInfo;
          body.categoryId = curCategoryId;
          console.log('body', body);
          addLinkContent(body).then(() => {
            resetPageIdx();
            resetTerm();
            getContents(contentsSize, curCategoryId).then((res) => {
              setContents([...res]);
            });

            if (ref !== null) {
              ref.current!.style.height = '38px';
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

  return (
    <div className="flex justify-center z-30 ">
      <div
        className={`fixed bottom-0 w-11/12 
       lg:w-9/12 m-4 z-30`}
      >
        <div className="flex w-full">
          <form
            onSubmit={onSubmitHandler}
            className="w-full rounded border-slate-300 bg-slate-300 "
          >
            <textarea
              onChange={onChangeNote}
              onKeyPress={onKeyDown}
              placeholder="Input URL"
              value={note}
              rows={1}
              ref={ref}
              onInput={handleResizeHeight}
              className="w-full border-slate-300 rounded-t resize-none outline-0 shadow-none overflow-hidden ring-0 focus:ring-0"
            ></textarea>
            <div className="relative bg-slate-300 h-8 flex border-t-slate-300 items-center rounded-b">
              <button
                type="submit"
                className="absolute right-1  p-2 text-slate-800"
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
