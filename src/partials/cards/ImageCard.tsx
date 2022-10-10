import React, { CSSProperties } from 'react';
import CardOptionButton from '../buttons/CardOptionButton';
import ClipLoader from 'react-spinners/ClipLoader';

interface IProps {
  content: any;
}

const ImageCard = (props: IProps) => {
  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative h-64">
      <div className="flex flex-col w-full">
        <a
          href={props.content.url}
          target="_blank"
          className="flex justify-center items-center w-full h-full overflow-hidden"
        >
          {props.content.id > 0 ? (
            <div>
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
              <ClipLoader color={'rgb(96 165 250)'} loading={true} size={80} />
            </div>
          )}
        </a>
      </div>

      <div className="absolute flex left-0 mt-2 ml-2">
        <p className="text-white bg-gray-500 opacity-60 w-6 h-5 rounded-md flex items-center">
          {props.content.category ? props.content.category.name : '전체'}
        </p>
      </div>
      <div className="absolute flex right-0 mt-2 mr-2">
        <CardOptionButton content={props.content} />
      </div>
    </div>
  );
};

export default ImageCard;
