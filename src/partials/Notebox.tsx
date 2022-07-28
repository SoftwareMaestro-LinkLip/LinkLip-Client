import React, { FunctionComponent, useCallback } from 'react';
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
