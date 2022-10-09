import React, { useCallback } from 'react';
import { getContents } from '../utils/content';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  termState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
  sidebarOpenState,
} from '../stores/dashboard';
import { contentsState } from '../stores/content';

const Header = () => {
  const [term, setTerm] = useRecoilState(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const contentsSize = useRecoilValue(contentsSizeState);
  const resetPageIdx = useResetRecoilState(pageIdxState);
  const setContents = useSetRecoilState(contentsState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);

  const onChangeHandler = useCallback(
    (event: any) => {
      setTerm(event.target.value);
    },
    [term, setTerm],
  );

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      resetPageIdx();
      getContents(contentsSize, curCategoryId, term).then((res) => {
        setContents([...res]);
      });
    },
    [contentsSize, curCategoryId, term, setContents],
  );

  const onResetHandelr = useCallback(
    (event: React.InputHTMLAttributes<HTMLInputElement>) => {
      setTerm('');
      getContents(contentsSize, curCategoryId, '').then((res) => {
        setContents([...res]);
      });
    },
    [setTerm, setContents],
  );

  return (
    <header className="flex justify-center py-2  z-30">
      <div className="fixed top-0 w-full lg:w-9/12 p-2 z-30">
        <div className="flex items-center">
          {/* Sidebar on/off button */}
          <button
            className="ml-4 sm:ml-6 sm:px-4 text-slate-400 hover:text-slate-400 lg:hidden "
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
          {/* Search */}
          <div className="flex justify-center w-full mx-2">
            <form onSubmit={onSubmitHandler} className="flex w-full relative">
              <div
                className="w-full
              p-2 relative flex px-3 py-1.5 text-base font-normal text-gray-700 bg-white border-none focus:outline-none focus:ring-0 rounded-3xl"
              >
                <button
                  type="submit"
                  className="w-12 h-10 flex items-center justify-center"
                  tabIndex={2}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
                <input
                  type="text"
                  className="form-control border-none focus:ring-0"
                  placeholder="저장한 내용 바로 찾기"
                  aria-label="검색"
                  onChange={onChangeHandler}
                  value={term}
                  tabIndex={1}
                ></input>

                {term && (
                  <button
                    className="absolute right-4 top-4"
                    onClick={onResetHandelr}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="gray"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
