import React, { useRef, useState, useCallback } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPressESC from '../../hooks/useKeyPressESC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ILinkContent, INoteContent } from '../../typings/content';
import { modalOpenState, openedContentState } from '../../stores/dashboard';
import { contentsState } from '../../stores/content';
import { useRecoilState } from 'recoil';
import { deleteContent } from '../../utils/content';

interface IProps {
  content: ILinkContent | INoteContent;
}

const CardOptionButton = (props: IProps) => {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);
  const [contents, setContents] = useRecoilState(contentsState);

  useOnClickOutside(
    ref,
    () => {
      setDropdownOpen(false);
    },
    dropdownOpen,
    false,
  );

  useKeyPressESC(() => {
    setDropdownOpen(false);
  });

  const onDropHandler = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [setDropdownOpen, dropdownOpen, setModalOpen]);

  const onEditHandler = () => {
    setOpenedContent(props.content);
    setDropdownOpen(false);
    setModalOpen(true);
  };

  const onDeleteHandler = () => {
    setDropdownOpen(false);
    deleteContent(props.content.id).then(() => {
      setContents([...contents.filter((item) => item.id !== props.content.id)]);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={onDropHandler}
        className="absolute bg-slate-200 opacity-60 hover:bg-white hover:opacity-80 w-9 h-7 rounded-lg m-2 right-0"
        aria-label="옵션 더보기 버튼"
      >
        <FontAwesomeIcon icon={faEllipsis} aria-hidden="true" />
      </button>

      {dropdownOpen && (
        <div
          ref={ref}
          className="z-50 absolute right-2 w-20 bg-white border border-slate-200 p-2 rounded shadow-lg mt-2 flex flex-col items-center"
        >
          <li className="list-none">
            <ol>
              <button
                className="inline-block px-4 py-2 bg-transparent text-blue-600 font-medium text-sm leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                onClick={onEditHandler}
              >
                수정
              </button>
            </ol>
            <ol>
              <button
                className="inline-block px-4 py-2 bg-transparent text-red-600 font-medium text-sm leading-tight uppercase rounded hover:text-red-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
                onClick={onDeleteHandler}
              >
                삭제
              </button>
            </ol>
          </li>
        </div>
      )}
    </div>
  );
};

export default CardOptionButton;