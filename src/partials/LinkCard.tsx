import React, { CSSProperties } from 'react';
import { ILinkContent, IContents } from '../typings/content';
import logo from '../assets/images/logo.png';
import { getShortURL } from '../utils/link';
import CardOptionButton from './CardOptionButton';
import ClipLoader from 'react-spinners/ClipLoader';

interface IProps {
  content: any;
}

const LinkCard = (props: IProps) => {
  return (
    <div className="flex overflow-hidden rounded-lg shadow-lg bg-white h-52 hover:-translate-y-1 hover:scale-110 hover:z-10 duration-300 relative">
      <div className="flex flex-col w-full">
        <a
          href={props.content.url}
          target="_blank"
          className=" flex justify-center w-full h-2/3 overflow-hidden "
        >
          {props.content.id > 0 ? (
            <img
              className=" block my-0 mx-auto w-full object-cover transition  duration-300"
              src={props.content.linkImg ? props.content.linkImg : logo}
              alt="props.content.title"
            />
          ) : (
            <div className="mt-10">
              <ClipLoader color={'rgb(96 165 250)'} loading={true} size={80} />
            </div>
          )}
        </a>

        <a
          href={props.content.url}
          target="_blank"
          className=" mx-2 mt-2 break-all leading-5 h-10 overflow-hidden"
        >
          {props.content.title}
        </a>
        <a
          href={props.content.url}
          target="_blank"
          className="text-slate-400 mx-2 break-all h-8 overflow-hidden"
        >
          {getShortURL(props.content.url)}
        </a>
      </div>
      <CardOptionButton content={props.content} />
    </div>
  );
};

export default LinkCard;
