import React, {
  FunctionComponent,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { ToolArea } from '../css/Conponents';
import { NoteContainer } from '../css/Containers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

interface IProps {
  onSubmitHandler: (e: any) => void;
  onChangeNote: (e: any) => void;
  note: string;
}

const Notebox: FunctionComponent<IProps> = ({
  onSubmitHandler,
  onChangeNote,
  note,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

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
  );
};

export default Notebox;
