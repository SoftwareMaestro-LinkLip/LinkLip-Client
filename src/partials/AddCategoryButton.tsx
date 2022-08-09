import React, {
  useEffect,
  useRef,
  useState,
  Dispatch,
  FunctionComponent,
  useCallback,
} from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useInput from '../hooks/useInput';
import { ICategory } from '../typings/types';

interface IProps {
  setCategories: Dispatch<React.SetStateAction<ICategory[]>>;
  categories: ICategory[];
  addCategory: (name: string) => Promise<boolean | void>;
}

const AddCategoryButton: FunctionComponent<IProps> = ({
  setCategories,
  categories,
  addCategory,
}) => {
  const ref = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, onChangeCategory] = useInput('');

  useOnClickOutside(
    ref,
    (event) => {
      setDropdownOpen(false);
    },
    dropdownOpen,
  );

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // =============
      // API 완성하면 연동하기
      // addCategory(category);

      // 임시로 로컬에서 카테고리 추가
      const newCategory = { id: categories.length, name: category };
      setCategories([...categories, newCategory]);
      setDropdownOpen(false);
      // =============
    },
    [setCategories, setDropdownOpen, categories, category],
  );

  const onDropHandler = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [setDropdownOpen, dropdownOpen]);

  return (
    <div>
      {dropdownOpen ? (
        <button
          className="flex justify-center items-center w-6 h-6 mr-2 rounded-lg bg-white border-slate-200 text-indigo-500 "
          aria-haspopup="true"
          onClick={onDropHandler}
          aria-expanded={dropdownOpen}
        >
          {/* <svg
            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 transform rotate-180`}
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg> */}
          ∆
        </button>
      ) : (
        <button
          className="flex justify-center items-center w-6 h-6 mr-2 rounded-lg bg-white border-slate-200 text-indigo-500 "
          aria-haspopup="true"
          onClick={onDropHandler}
          aria-expanded={dropdownOpen}
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
        </button>
      )}

      {dropdownOpen && (
        <div
          ref={ref}
          className="origin-top-right z-50 absolute right-5 w-4/5 bg-white border border-slate-200 p-2 rounded shadow-lg mt-1"
        >
          <div></div>
          <form onSubmit={onSubmitHandler}>
            <label
              htmlFor="newCategory"
              className="my-2 text-xs font-semibold text-slate-400 px-4"
            >
              카테고리 추가
            </label>
            <input
              type="search"
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
              id="newCategory"
              placeholder="카테고리 입력"
              onChange={onChangeCategory}
            />
            <button
              type="submit"
              className="inline-block px-6 py-2.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
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
