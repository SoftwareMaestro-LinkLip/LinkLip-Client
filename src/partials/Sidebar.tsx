import React, { useEffect, useRef } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import AddCategoryButton from './buttons/AddCategoryButton';
import CategoryOptionButton from './buttons/CategoryOptionButton';
import EditCategoryInput from './EditCategoryInput';
import { useRecoilState } from 'recoil';
import { categoriesState } from '../stores/category';
import { getCategories } from '../utils/category';
import { editCategoryIdState } from '../stores/category';
import { curCategoryIdState, sidebarOpenState } from '../stores/dashboard';
import { userNameState } from '../stores/user';
import logo from '../assets/images/linklip_logo.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const ref = useRef(null);
  const [curCategoryId, setCurCategoryId] = useRecoilState(curCategoryIdState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [editCategoryId, setEditCategoryId] =
    useRecoilState(editCategoryIdState);
  const [userName, setUserName] = useRecoilState(userNameState);

  useOnClickOutside(
    ref,
    () => {
      setSidebarOpen(false);
    },
    sidebarOpen,
  );

  useKeyPressESC(() => {
    setSidebarOpen(false);
  });

  useEffect(() => {
    if (!userName.length) {
      getCategories(true).then((res) => {
        const filtered = new Array();
        res.forEach((item: any) => {
          if (item.name.startsWith('__linklip:')) {
            setUserName(item.name.split(':')[1]);
          } else {
            filtered.push(item);
          }
        });

        setCategories([...filtered]);
      });
    } else {
      getCategories().then((res) => {
        setCategories([...res]);
      });
    }
  }, []);

  return (
    <div
      ref={ref}
      id="sidebar"
      className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll scrollbar-hide lg:overflow-y-auto no-scrollbar w-52 lg:w-52 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      {/* Sidebar header */}
      <div className="flex justify-between mb-10 pr-3 sm:px-2 z-50">
        {/* Linklip Logo */}
        <Link to="/dashboard">
          <img src={logo} className="max-h-6 mt-2" />
        </Link>
        {/* Close button */}
        <button
          className="lg:hidden text-slate-500 hover:text-slate-400"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
        >
          <span className="sr-only">사이드바 닫기</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>
      {/* 카테고리 목록 */}
      <nav className="space-y-4 grow">
        <div className="flex justify-between rounded-md outline outline-1 outline-slate-200 bg-bg_gray py-2">
          <h3 className="text-md text-black font-semibold pl-3 " tabIndex={3}>
            {userName} <span className="text-sm text-gray-600">님</span>
          </h3>
          <AddCategoryButton />
        </div>
        <ul>
          {categories.map((item) => {
            return (
              <li
                className={`flex py-0.5 last:mb-0 text-lg ${
                  curCategoryId === item.id ? 'text-black' : 'text-gray-400'
                }`}
                key={item.id ? item.id : 0}
              >
                {!editCategoryId || editCategoryId !== item.id ? (
                  <>
                    <button
                      className="w-full px-3 text-left overflow-hidden whitespace-nowrap"
                      onClick={() => {
                        setCurCategoryId(item.id);
                      }}
                    >
                      {item.name}
                    </button>
                    {!!item.id && <CategoryOptionButton categoryId={item.id} />}
                  </>
                ) : (
                  <EditCategoryInput categoryInfo={item} />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* 추가 설정 */}
      <div className="bottom-0 space-y-3 mb-3">
        <hr className="my-4 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <Link to="/logout" className="text-gray-700 block px-3">
          로그아웃
        </Link>
        <a
          target="_blank"
          href="https://forms.gle/ZopyuPueViXbp5gT7"
          className="text-gray-400 block px-3"
        >
          건의하기
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
