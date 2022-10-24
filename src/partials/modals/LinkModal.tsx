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
import {
  editLinkContent,
  getContents,
  getLinkContent,
} from '../../utils/content';
import { IEditLinkContent, ILinkContent } from '../../typings/content';
import useInput from '../../hooks/useInput';

interface IProps {
  content: any;
}

const Modal = (props: IProps) => {
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
  const [title, onChangeTitle] = useInput(props.content.title);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const [contentsSize, setContentsSize] = useRecoilState(contentsSizeState);
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const [term, setTerm] = useRecoilState(termState);
  const [content, setContent] = useState<null | ILinkContent>(null);

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
    getLinkContent(props.content.id).then((res) => {
      setContent(res);
      if (res && !!res.category) {
        setSelectedCategoryId(res.category.id!);
      }
    });

    const htmlLabel = document.querySelectorAll('label');
    if (!!htmlLabel) {
      htmlLabel[0].focus();
    }
  }, []);

  const editHandler = () => {
    setModalOpen(false);

    const body: IEditLinkContent = {
      categoryId: selectedCategoryId != 0 ? selectedCategoryId : null,
      title,
    };

    editLinkContent(props.content.id, body).then(() => {
      getContents(contentsSize * (pageIdx + 1), curCategoryId, term, 0).then(
        (res) => {
          setContents([...res]);
        },
      );
    });
  };

  return (
    <div className="flex justify-center w-full">
      <div
        ref={ref}
        className="flex flex-col z-50 w-full h-full sm:max-w-2xl sm:h-2/3 bg-bg_gray sm:rounded-lg shadow fixed top-1/2 transform -translate-y-1/2 lg:translate-x-4"
      >
        {/* modal header */}
        <div className="flex justify-between items-start pt-4 px-4 rounded-t border-b ">
          {/* Close Button */}
          <button
            type="button"
            className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
        <div className="my-3 mx-6 space-y-3 h-auto overflow-y-scroll">
          <form className="mr-4">
            <div className="flex min-w-1/2 items-center">
              {/* 카테고리 선택 */}
              <label
                htmlFor="category"
                className="inline shrink-0 text-md font-medium text-gray-600 mr-2"
              >
                카테고리
              </label>
              <select
                id="category"
                onChange={onChangeSelectedCategoryId}
                className="inline bg-white border border-gray-300 text-gray-900 text-md rounded-lg w-32 max-w-lg p-2.5  mb-2 focus:border-gray-200 focus:outline-none focus:ring-0"
              >
                <option defaultValue={selectedCategoryId}>
                  {content?.category ? content.category.name : '없음'}
                </option>
                {!!props.content?.category && (
                  <option value={0}>선택안함</option>
                )}
                {userCategories.map((item) => {
                  if (
                    !content?.category ||
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
            {/* 링크 썸네일 */}
            {props.content.linkImg && (
              <div className="flex justify-center w-full max-h-64 overflow-hidden">
                <img
                  className=" block my-0 mx-auto w-full object-cover transition  duration-300"
                  src={props.content.linkImg}
                  alt={props.content.title}
                />
              </div>
            )}

            {/* 제목 */}
            <label
              htmlFor="title"
              className="inline shrink-0 text-md font-medium text-gray-900"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              onChange={onChangeTitle}
              value={title}
              className="inline bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-200 w-full p-2.5"
            />
            {/* URL 주소 */}
            <label
              htmlFor="url"
              className="inline shrink-0 text-md font-medium text-gray-900 "
            >
              URL
            </label>
            <input
              readOnly
              type="text"
              id="url"
              onChange={onChangeTitle}
              value={props.content.url}
              className="bg-bg_gray border border-gray-300 focus:ring-0 focus:border-gray-200 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </form>
        </div>
        {/* 버튼 */}
        <div className=" bottom-2 flex items-center px-6 pb-4 space-x-2 rounded-b border-t border-gray-200 ">
          <button
            onClick={editHandler}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-white bg-signiture hover:bg-green-400 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
          >
            수정
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            data-modal-toggle="defaultModal"
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-400 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
