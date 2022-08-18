import { Dispatch, FunctionComponent, useState, useEffect } from 'react';
import '../css/reset.css';
import { HeaderContainer } from '../css/Containers';
import useInput from '../hooks/useInput';
import { getContents } from '../utils/content';
import { IContent } from '../typings/types';

interface IProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
  setPage: Dispatch<React.SetStateAction<number>>;
  setContents: Dispatch<React.SetStateAction<IContent[]>>;
  term: string;
  onChangeTerm: (e: any) => void;
  contentsSize: number;
  curCategoryId: number;
}

const Header = (props: IProps) => {
  // const [term, onChangeTerm] = useInput('');

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.setPage(0);

    getContents(props.term, 0, props.curCategoryId, props.contentsSize).then(
      (res) => {
        props.setContents([...res]);
      },
    );

    // const res = getContents(term, 0);
    // props.setContents([...res]);
  };

  return (
    <header className="flex justify-center py-2  z-30">
      <div className="fixed top-0 w-full lg:w-9/12 p-2 z-30">
        <div className="flex items-center">
          <button
            className="px-4 text-slate-400 hover:text-slate-400 lg:hidden "
            aria-controls="sidebar"
            aria-expanded={props.sidebarOpen}
            onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
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
          <div className="flex justify-center w-full ">
            <form onSubmit={onSubmitHandler} className="flex w-full">
              <input
                type="search"
                className="form-control w-full
              p-2 relative block px-3 py-1.5 text-base font-normal text-gray-700 bg-white  border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                onChange={props.onChangeTerm}
                value={props.term}
                tabIndex={1}
              />
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
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
