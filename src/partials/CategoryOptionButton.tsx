import React, { useRef, useState, Dispatch, useCallback } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  setEditCategoryId: Dispatch<React.SetStateAction<number>>;
  categoryId: number;
}

const CategoryOptionButton = (props: IProps) => {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  useOnClickOutside(
    ref,
    () => {
      setDropdownOpen(false);
    },
    dropdownOpen,
  );

  useKeyPressESC(() => {
    setDropdownOpen(false);
  });

  const onDropHandler = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [setDropdownOpen, dropdownOpen]);

  const onEditHandler = useCallback(() => {
    props.setEditCategoryId(props.categoryId);
    setDropdownOpen(false);
  }, [dropdownOpen, editorOpen, setDropdownOpen, setEditorOpen]);

  return (
    <div>
      <button
        className="justify-center items-center w-4 h-6  text-slate-400"
        aria-haspopup="true"
        onClick={onDropHandler}
        aria-expanded={dropdownOpen}
        aria-label="옵션 더보기"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} aria-hidden="true" />
      </button>

      {dropdownOpen && (
        <div
          ref={ref}
          className="origin-top-right z-50 absolute right-5 w-30 bg-white border border-slate-200 p-2 rounded shadow-lg mt-1"
        >
          <button
            className="inline-block px-4 py-2 bg-transparent text-blue-600 font-medium text-sm leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
            onClick={onEditHandler}
          >
            수정
          </button>
        </div>
      )}

      {editorOpen && (
        <div
          ref={ref}
          className="origin-right z-50 absolute right-5 w-30 bg-white border border-slate-200 p-2 rounded shadow-lg mt-1"
        >
          <button className="inline-block px-4 py-2 bg-transparent text-blue-600 font-medium text-sm leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out">
            수정
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryOptionButton;
