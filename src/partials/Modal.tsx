import React, { useCallback, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import { modalOpenState } from '../stores/dashboard';
import { useRecoilState } from 'recoil';

const Modal = () => {
  const ref = useRef(null);
  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState);

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
    <div
      ref={ref}
      className="flex flex-col z-50 w-5/6 h-5/6 sm:w-2/3 sm:h-2/3 bg-white rounded-lg shadow dark:bg-gray-700 fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-translate-x-1/3"
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
      <div className="my-3 mx-6 space-y-6 h-auto max-h-56 overflow-y-scroll scrollbar-hide">
        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default Modal;
