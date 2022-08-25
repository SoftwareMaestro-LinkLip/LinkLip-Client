import React, { useCallback, useRef, useState, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import {
  modalOpenState,
  openedContentState,
  termState,
  curCategoryIdState,
  contentsSizeState,
} from '../stores/dashboard';
import { userCategoriesState, categoriesState } from '../stores/category';
import { contentsState } from '../stores/content';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editLinkContent, getContents } from '../utils/content';
import { IEditContentInfo } from '../typings/types';
import useInput from '../hooks/useInput';

const Modal = () => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);
  const [userCategories, setUserCategories] =
    useRecoilState(userCategoriesState);
  const [contents, setContents] = useRecoilState(contentsState);
  const [selectedCategory, onChangeSelectedCategory] = useInput(-1);
  const [title, onChangeTitle] = useInput(openedContent.title);
  const term = useRecoilValue(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const contentsSize = useRecoilValue(contentsSizeState);

  useOnClickOutside(
    ref,
    () => {
      // editHandler();
      setModalOpen(false);
    },
    modalOpen,
  );

  useKeyPressESC(() => {
    // editHandler();
    setModalOpen(false);
  });

  useEffect(() => {
    const htmlLabel = document.querySelectorAll('label');
    if (!!htmlLabel) {
      htmlLabel[0].focus();
    }
  }, []);

  const editHandler = useCallback(() => {
    const body: IEditContentInfo = {
      categoryId: selectedCategory > 0 ? selectedCategory : 1,
      title,
    };
    editLinkContent(openedContent.id, body).then((res) => {
      // setContents([
      //   ...contents.filter((item) => item.categoryName !== selectedCategory),
      // ]);
    });

    getContents(contentsSize, curCategoryId, term).then((res) => {
      setContents([...res]);
      setModalOpen(false);
    });
  }, [selectedCategory, title]);

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
          <div className="flex min-w-1/2 items-center">
            <label
              htmlFor="category"
              className="inline shrink-0 text-md font-medium text-gray-900 dark:text-gray-400 mr-2"
            >
              카테고리
            </label>
            <select
              id="category"
              onChange={onChangeSelectedCategory}
              className="inline bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 w-32 max-w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={openedContent.categoryName}>
                {openedContent.categoryName
                  ? openedContent.categoryName
                  : '없음'}
              </option>
              ;<option value={0}>선택안함</option>
              {userCategories.map((item) => {
                return (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-center w-full max-h-64 overflow-hidden">
            <img
              className=" block my-0 mx-auto w-full object-cover transition  duration-300"
              src={openedContent.linkImg}
              alt={openedContent.title}
            />
          </div>
          <form>
            <div className="flex items-center">
              <label
                htmlFor="title"
                className="shrink-0 text-sm mr-2 font-medium text-gray-900 dark:text-gray-300"
              >
                제목
              </label>
              <input
                type="text"
                id="title"
                onChange={onChangeTitle}
                value={title}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
          </form>
          <p className="text-base leading-relaxed text-gray-300">
            {openedContent.url}
          </p>
        </div>
        {/* 버튼 */}
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={editHandler}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            수정
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
