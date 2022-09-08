import React, { useCallback } from 'react';
import CardOptionButton from '../buttons/CardOptionButton';
import ClipLoader from 'react-spinners/ClipLoader';
import { modalOpenState, openedContentState } from '../../stores/dashboard';
import { useRecoilState } from 'recoil';

interface IProps {
  content: any;
}

const LinkCard = (props: IProps) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);

  const onClickHandler = () => {
    setOpenedContent(props.content);
    setModalOpen(true);
  };

  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white h-52 hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative">
      <button
        className="h-48 m-2 w-full overflow-hidden"
        onClick={onClickHandler}
      >
        <p className="text-start h-full">{props.content.text}</p>
      </button>
      <CardOptionButton content={props.content} />
    </div>
  );
};

export default LinkCard;
