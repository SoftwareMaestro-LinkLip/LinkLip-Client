import React, { Dispatch, useCallback, useRef, useEffect } from 'react';
import { ToolArea } from '../css/Conponents';
import { NoteContainer } from '../css/Containers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { isURL, getFullURL } from '../utils/link';
import { IContent } from '../typings/types';

import useInput from '../hooks/useInput';
import axios from 'axios';

interface IProps {
  sidebarOpen: boolean;
  setPage: Dispatch<React.SetStateAction<number>>;
  getContents: () => void;
  setContents: Dispatch<React.SetStateAction<IContent[]>>;
  contents: IContent[];
}

const Notebox = (props: IProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [note, onChangeNote, setNote] = useInput('');

  useEffect(() => {
    if (ref === null || ref.current === null) {
      return;
    }
    // ref.current.style.height = '38px';
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
        const tempContent = {
          id: 0,
          url: note,
          linkImg: '',
          title: '',
          text: '',
        };
        setNote('');
        props.setContents([tempContent, ...props.contents]);
        axios
          .get(
            `${import.meta.env.VITE_API_PARSER}/link/v1?url=${getFullURL(
              note,
            ).replace(/^([^?#]*).*/, '$1')}`,
          )
          .then((response) => {
            axios
              .post(
                `${import.meta.env.VITE_API_SERVER}/content/v1/link`,
                response.data.data,
                {
                  withCredentials: true,
                  headers: { 'Content-Type': 'application/json' },
                },
              )
              .then(() => {
                props.setPage(0);

                if (ref !== null) {
                  ref.current!.style.height = '38px';
                }
                props.getContents();
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [note, setNote, props.setPage, props.getContents],
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
    <div className="flex justify-center">
      <div
        className={`fixed bottom-0 w-full
       lg:w-9/12  p-2`}
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
