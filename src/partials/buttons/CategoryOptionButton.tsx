import React, { useRef, useState, Dispatch, useCallback } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPressESC from '../../hooks/useKeyPressESC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useSetRecoilState, useRecoilState } from 'recoil';
import {
  editCategoryIdState,
  userCategoriesState,
} from '../../stores/category';
import { deleteCategory } from '../../utils/category';
import { contentsState } from '../../stores/content';
import { IContents } from '../../typings/content';
import { getContents } from '../../utils/content';

interface IProps {
  categoryId: number | null;
}

const CategoryOptionButton = (props: IProps) => {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const setEditCategoryId = useSetRecoilState(editCategoryIdState);
  const [categories, setCategories] = useRecoilState(userCategoriesState);

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
    if (props.categoryId) {
      setEditCategoryId(props.categoryId);
    }
    setDropdownOpen(false);
  }, [dropdownOpen, editorOpen, setDropdownOpen, setEditorOpen]);

  const onDeleteHandler = useCallback(() => {
    getContents(1, props.categoryId).then((res) => {
      if (!!res.length) {
        alert('카테고리에 포함된 컨텐츠가 있어, 삭제를 할 수 없습니다.');
        return;
      }
      if (props.categoryId) {
        deleteCategory(props.categoryId).then((res) => {
          if (res) {
            setCategories([
              ...categories.filter((item) => {
                if (item.id && item.id !== props.categoryId) {
                  return item;
                }
              }),
            ]);
          }
        });
      }
    });
  }, []);

  return (
    <div>
      <button
        className="justify-center items-center w-4 h-6  text-gray-400"
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
          <div className="flex flex-col">
            <button
              className="inline-block px-4 py-2 bg-transparent text-green-400 font-medium text-sm leading-tight uppercase rounded hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
              onClick={onEditHandler}
            >
              수정
            </button>

            <button
              className="inline-block px-4 py-2 bg-transparent text-red-600 font-medium text-sm leading-tight uppercase rounded hover:text-red-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
              onClick={onDeleteHandler}
            >
              삭제
            </button>
          </div>
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
