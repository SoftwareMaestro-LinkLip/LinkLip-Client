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

const Sidebar = () => {
  const ref = useRef(null);
  const [curCategoryId, setCurCategoryId] = useRecoilState(curCategoryIdState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [editCategoryId, setEditCategoryId] =
    useRecoilState(editCategoryIdState);

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
    getCategories().then((res) => {
      setCategories([...res]);
    });
  }, []);

  return (
    <div
      ref={ref}
      id="sidebar"
      className={`flex flex-col absolute z-50 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll scrollbar-hide lg:overflow-y-auto no-scrollbar w-52 lg:w-52 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-white p-4 transition-all duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      {/* Sidebar header */}
      <div className="flex justify-between mb-10 pr-3 sm:px-2 z-50">
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
      <nav className="space-y-4">
        <div className="flex justify-between rounded-md outline outline-1 outline-slate-200 bg-bg_gray py-2">
          <h3 className="text-md text-black font-semibold pl-3 " tabIndex={3}>
            카테고리
          </h3>
          <AddCategoryButton />
        </div>
        <ul>
          {categories.map((item) => {
            return (
              <li
                className={`flex py-0.5 last:mb-0 text-slate-400 text-lg ${
                  curCategoryId === item.id && 'text-black'
                }`}
                key={item.id ? item.id : 0}
              >
                {!editCategoryId || editCategoryId !== item.id ? (
                  <>
                    <button
                      className="w-full px-3 text-left overflow-hidden"
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
    </div>
  );
};

export default Sidebar;
