import React, { Dispatch, useCallback, useRef, useEffect } from 'react';
import { ToolArea } from '../css/Conponents';
import { NoteContainer } from '../css/Containers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { isURL, getMetaData } from '../utils/link';
import useInput from '../hooks/useInput';
import axios from 'axios';

interface IProps {
  sidebarOpen: boolean;
  setPage: Dispatch<React.SetStateAction<number>>;
  getContents: () => void;
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
        getMetaData(note).then((body) => {
          // ============
          console.log('body:', body);
          // ============
          axios
            .post(`${import.meta.env.VITE_API_URL}/content/v1/link`, body, {
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' },
            })
            .then((response) => {
              props.setPage(0);
              props.getContents();
              setNote('');
              if (ref !== null) {
                ref.current!.style.height = '38px';
              }
            })
            .catch((err) => {
              console.log(err);
              return false;
            });
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
