import React, { Dispatch, useCallback, useRef, useEffect } from 'react';
import { ToolArea } from '../css/Conponents';
import { NoteContainer } from '../css/Containers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { isURL, getFullURL, parse } from '../utils/link';
import { ILinkContent } from '../typings/types';
import { getContents, addLinkContent } from '../utils/content';
import { useResetRecoilState, useRecoilValue } from 'recoil';
import {
  termState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
} from '../stores/atoms';
import useInput from '../hooks/useInput';

interface IProps {
  sidebarOpen: boolean;
  setContents: Dispatch<React.SetStateAction<ILinkContent[]>>;
  contents: ILinkContent[];
}

const Notebox = (props: IProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [note, onChangeNote, setNote] = useInput('');
  const resetTerm = useResetRecoilState(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const contentsSize = useRecoilValue(contentsSizeState);
  const resetPageIdx = useResetRecoilState(pageIdxState);

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
        };
        setNote('');
        props.setContents([loadingContent, ...props.contents]);

        parse(note).then((body) => {
          body.categoryId = curCategoryId;
          addLinkContent(body).then(() => {
            resetPageIdx();
            resetTerm();
            getContents('', 0, curCategoryId, contentsSize).then((res) => {
              props.setContents([...res]);
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
    <div className="flex justify-center z-40 hover:z-40">
      <div
        className={`fixed bottom-0 w-full
       lg:w-9/12  p-2 z-40`}
      >
        <NoteContainer>
          <form onSubmit={onSubmitHandler}>
            <textarea
              onChange={onChangeNote}
              onKeyPress={onKeyDown}
              placeholder="Input URL"
              value={note}
              rows={1}
              ref={ref}
              onInput={handleResizeHeight}
            ></textarea>
            <ToolArea>
              <button type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </ToolArea>
          </form>
        </NoteContainer>
      </div>
    </div>
  );
};

export default Notebox;
