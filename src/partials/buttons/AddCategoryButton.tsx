import React, { useEffect, useRef, useState, useCallback } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPressESC from '../../hooks/useKeyPressESC';
import useInput from '../../hooks/useInput';
import { addCategory, getCategories } from '../../utils/category';
import { useRecoilState } from 'recoil';
import { categoriesState } from '../../stores/category';

const AddCategoryButton = () => {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, onChangeName] = useInput('');
  const [categories, setCategories] = useRecoilState(categoriesState);

  useOnClickOutside(
    ref,
    () => {
      setDropdownOpen(false);
    },
    dropdownOpen,
  );

  useKeyPressESC(() => {
    setDropdownOpen(false);
    const htmlButtons = document.querySelectorAll('button');
    if (!!htmlButtons) {
      htmlButtons[1].focus();
    }
  });

  useEffect(() => {
    if (dropdownOpen) {
      const htmlInput = document.querySelector('input');
      if (htmlInput) {
        htmlInput.focus();
      }
    }
  }, [dropdownOpen]);

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      addCategory(name).then(() => {
        getCategories().then((res) => {
          setCategories([...res]);
        });
      });
      setDropdownOpen(false);
    },
    [setCategories, setDropdownOpen, categories, name],
  );

  const onDropHandler = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [setDropdownOpen, dropdownOpen]);

  return (
    <div>
      {dropdownOpen ? (
        <button
          className="flex justify-center items-center w-6 h-6 mr-2 text-slate-400"
          aria-haspopup="true"
          onClick={onDropHandler}
          aria-expanded={dropdownOpen}
        >
          ∆
        </button>
      ) : (
        <button
          className="flex justify-center items-center w-6 h-6 mr-2 text-slate-400"
          aria-haspopup="true"
          onClick={onDropHandler}
          aria-expanded={dropdownOpen}
          aria-label="카테고리 추가"
        >
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      )}

      {dropdownOpen && (
        <div
          ref={ref}
          className="origin-top-right z-50 absolute right-5 w-4/5 bg-white border border-slate-200 p-2 rounded shadow-lg mt-1"
        >
          <form onSubmit={onSubmitHandler}>
            <label
              htmlFor="newCategory"
              className="my-2 text-xs font-semibold text-gray-400 px-4"
            >
              카테고리 추가
            </label>
            <input
              type="text"
              className="
        block
        w-full
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        my-2
        focus:text-gray-700 focus:bg-white focus:border-signiture focus:outline-none focus:ring-0
      "
              id="newCategory"
              placeholder="카테고리 입력"
              onChange={onChangeName}
            />
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-transparent text-signiutre font-medium text-xs leading-tight focus:outline-none focus:ring-0 transition text-green-400"
            >
              추가
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddCategoryButton;
