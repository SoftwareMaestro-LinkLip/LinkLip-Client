import React, { useCallback, useRef, useState, useEffect } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import useKeyPressESC from '../../hooks/useKeyPressESC';
import {
  modalOpenState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
  termState,
} from '../../stores/dashboard';
import { userCategoriesState } from '../../stores/category';
import { contentsState } from '../../stores/content';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editImageContent, getContents } from '../../utils/content';
import { IEditImageContent } from '../../typings/content';
import useInput from '../../hooks/useInput';

interface IProps {
  content: any;
}

const ImageModal = (props: IProps) => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);
  const [userCategories, setUserCategories] =
    useRecoilState(userCategoriesState);
  const [contents, setContents] = useRecoilState(contentsState);
  const [
    selectedCategoryId,
    onChangeSelectedCategoryId,
    setSelectedCategoryId,
  ] = useInput(0);
  const [text, onChangeText] = useInput(props.content.text);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const [contentsSize, setContentsSize] = useRecoilState(contentsSizeState);
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const [term, setTerm] = useRecoilState(termState);

  useOnClickOutside(
    ref,
    () => {
      setModalOpen(false);
    },
    modalOpen,
  );

  useKeyPressESC(() => {
    setModalOpen(false);
  });

  useEffect(() => {
    if (props.content.category && props.content.category.id) {
      setSelectedCategoryId(props.content.category.id);
    }

    const htmlTextarea = document.querySelectorAll('input');
    if (!!htmlTextarea) {
      htmlTextarea[0].focus();
    }
  }, []);

  const editHandler = () => {
    setModalOpen(false);

    const body: IEditImageContent = {
      categoryId: selectedCategoryId != 0 ? selectedCategoryId : null,
    };

    editImageContent(props.content.id, body).then(() => {
      getContents(contentsSize, curCategoryId, term, pageIdx).then((res) => {
        setContents([...res]);
      });
    });
  };

  return (
    <div className="flex justify-center w-full">
      <div
        ref={ref}
        className="flex flex-col justify-between z-50 w-full h-full  bg-bg_gray sm:rounded-lg shadow fixed top-1/2 transform -translate-y-1/2 lg:translate-x-4"
      >
        {/* modal header */}
        <div className="flex justify-between items-start pt-4 px-4 rounded-t border-b ">
          <button
            type="button"
            className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-toggle="defaultModal"
            onClick={() => {
              setModalOpen(false);
            }}
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
        <div className="my-3 mx-6 space-y-3 h-full ">
          <form className="h-full flex flex-col">
            <div className="flex min-w-1/2 items-center f-">
              <label
                htmlFor="category"
                className="inline shrink-0 text-md font-medium text-gray-900  mr-2"
              >
                카테고리
              </label>
              <select
                id="category"
                onChange={onChangeSelectedCategoryId}
                className="inline bg-white border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-0 focus:border-gray-200 w-32 max-w-lg p-2.5 mb-2"
              >
                <option
                  defaultValue={
                    props.content?.category && props.content.category.id
                      ? props.content.category.id
                      : 0
                  }
                >
                  {props.content?.category
                    ? userCategories.filter(
                        (item) => props.content.category!.id === item.id,
                      )[0].name
                    : '없음'}
                </option>
                {!!props.content?.category && (
                  <option value={0}>선택안함</option>
                )}
                {userCategories.map((item) => {
                  if (
                    !props.content?.category ||
                    props.content.category.id != item.id
                  ) {
                    return (
                      <option value={item.id!} key={item.id}>
                        {item.name}
                      </option>
                    );
                  }
                })}
              </select>
            </div>

            <div
              style={{ backgroundImage: `url(${props.content.linkImg})` }}
              className="h-full bg-contain bg-no-repeat bg-center "
            />
          </form>
        </div>
        {/* 버튼 */}
        <div className="flex items-center px-6 pb-4 space-x-2 rounded-b border-t border-gray-200 ">
          <button
            onClick={editHandler}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-signiture hover:bg-green-400 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            수정
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-400 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
