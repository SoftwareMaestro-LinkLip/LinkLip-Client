import React, { CSSProperties } from 'react';
import CardOptionButton from '../buttons/CardOptionButton';
import { modalOpenState, openedContentState } from '../../stores/dashboard';
import { useRecoilState } from 'recoil';
import ClipLoader from 'react-spinners/ClipLoader';

interface IProps {
  content: any;
}

const ImageCard = (props: IProps) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);

  const onClickHandler = () => {
    setOpenedContent(props.content);
    setModalOpen(true);
  };

  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative h-64">
      <button onClick={onClickHandler} className="flex flex-col w-full h-full">
        {props.content.id > 0 ? (
          <div className="flex w-full h-full overflow-hidden">
            {props.content.linkImg && (
              <img
                className=" block my-0 mx-auto w-full object-cover transition  duration-300"
                src={props.content.linkImg}
                alt="Image"
              />
            )}
          </div>
        ) : (
          <div className="mt-10">
            <ClipLoader color={'rgb(0 255 127)'} loading={true} size={80} />
          </div>
        )}
      </button>

      <div className="absolute flex left-0 mt-2 ml-2">
        <div
          className="text-start text-white bg-gray-500 opacity-60 h-5 rounded-md flex items-center px-1 overflow-hidden whitespace-nowrap"
          style={{ fontSize: '0.725rem', maxWidth: '6rem' }}
        >
          {props.content.category ? props.content.category.name : '전체'}
        </div>
      </div>
      <div className="absolute flex right-0 mt-2 mr-2">
        <CardOptionButton content={props.content} />
      </div>
    </div>
  );
};

export default ImageCard;
