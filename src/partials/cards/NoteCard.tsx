import React, { useCallback } from 'react';
import CardOptionButton from '../buttons/CardOptionButton';
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
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white h-64 hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative">
      <button
        className="h-full m-2 w-full overflow-hidden"
        onClick={onClickHandler}
      >
        <p className="text-start text-xs text-gray-500 m-2 whitespace-nowrap">
          {props.content.category ? props.content.category.name : '전체'}
        </p>
        <p className="text-start h-full mx-2">{props.content.text}</p>
      </button>
      <div className="absolute flex right-0 mt-2 mr-2">
        <CardOptionButton content={props.content} />
      </div>
    </div>
  );
};

export default LinkCard;
