import React, { CSSProperties } from 'react';
import logo from '../../assets/images/logo.png';
import { getShortURL, getDomainName } from '../../utils/link';
import CardOptionButton from '../buttons/CardOptionButton';
import ClipLoader from 'react-spinners/ClipLoader';

interface IProps {
  content: any;
}

const LinkCard = (props: IProps) => {
  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative h-64">
      <a
        href={props.content.url}
        target="_blank"
        className="flex flex-col w-full"
      >
        {/* 썸네일 */}
        <div
          className={
            props.content.id == 0 || props.content.linkImg
              ? `flex justify-center items-center w-full h-2/3 overflow-hidden`
              : `hidden`
          }
        >
          {props.content.linkImg ? (
            <img
              className=" block my-0 mx-auto w-full h-full object-cover transition  duration-300"
              src={props.content.linkImg}
              alt="props.content.title"
            />
          ) : (
            <div className="mt-10">
              <ClipLoader color={'rgb(0 255 127)'} loading={true} size={80} />
            </div>
          )}
        </div>
        {/* 카테고리 */}
        <p
          className="text-start text-xs text-gray-500 m-2 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ maxWidth: '6rem' }}
        >
          {props.content.category ? props.content.category.name : '전체'}
        </p>
        {/* 제목 */}
        <div className="text-sm mx-2 mb-10 pb-2 break-all leading-5 h-10 overflow-hidden">
          {props.content.title}
        </div>
        {/* URL 주소 */}
        <a
          href={props.content.url}
          target="_blank"
          className="absolute bottom-1 text-sm text-slate-400 mx-2 break-all h-6 mb-1 overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ maxWidth: '50%' }}
        >
          {getShortURL(props.content.url)}
        </a>
      </a>
      <div className="absolute flex right-0 mt-2 mr-2">
        <CardOptionButton content={props.content} />
        <div
          className=" text-white bg-gray-500 opacity-60 w-6 h-5 rounded-md flex items-center ml-1"
          style={{ fontSize: '0.25rem' }}
        >
          <p className="pl-1.5">url</p>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
