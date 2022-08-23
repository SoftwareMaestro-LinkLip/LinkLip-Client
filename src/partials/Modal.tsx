import React, { useCallback, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import { modalOpenState, openedContentState } from '../stores/dashboard';
import { userCategoriesState } from '../stores/category';
import { useRecoilState, useRecoilValue } from 'recoil';

const Modal = () => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);
  const categories = useRecoilValue(userCategoriesState);

  useOnClickOutside(
    ref,
    () => {
      editHandler();
    },
    modalOpen,
  );

  useKeyPressESC(() => {
    editHandler();
  });

  const editHandler = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div
        ref={ref}
        className="flex flex-col z-50 w-5/6 h-5/6 sm:max-w-2xl sm:h-2/3 bg-white rounded-lg shadow dark:bg-gray-700 fixed top-1/2 transform -translate-y-1/2 lg:translate-x-4"
      >
        {/* modal header */}
        <div className="flex justify-between items-start pt-4 px-4 rounded-t border-b dark:border-gray-600">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="defaultModal"
            onClick={editHandler}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">모달 닫기</span>
          </button>
        </div>
        {/* <!-- Modal body --> */}
        <div className="my-3 mx-6 space-y-6 h-auto overflow-y-scroll scrollbar-hide">
          <form className="flex max-w-1/2 items-center">
            <label
              htmlFor="category"
              className="inline shrink-0 text-md font-medium text-gray-900 dark:text-gray-400 mr-2"
            >
              카테고리
            </label>
            <select
              id="category"
              className="inline bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={openedContent.categoryName}>
                {openedContent.categoryName
                  ? openedContent.categoryName
                  : '없음'}
              </option>
              ;<option value={0}>선택안함</option>
              {categories.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </form>

          <div className="flex justify-center w-full max-h-64 overflow-hidden">
            <img
              className=" block my-0 mx-auto w-full object-cover transition  duration-300"
              src={openedContent.linkImg}
              alt={openedContent.title}
            />
          </div>
          <p className="text-base leading-relaxed text-white ">
            {openedContent.title}
          </p>
          <p className="text-base leading-relaxed text-white">
            {openedContent.url}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
