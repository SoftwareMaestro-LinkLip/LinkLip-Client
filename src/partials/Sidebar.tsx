import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  Dispatch,
  useCallback,
} from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { ICategory } from '../typings/types';
import { SidebarContainer } from '../css/Containers';
import AddCategoryButton from './AddCategoryButton';
import CategoryOptionButton from './CategoryOptionButton';
import EditCategoryInput from './EditCategoryInput';
import axios from 'axios';

interface IProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = (props: IProps) => {
  const ref = useRef(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selected, setSelected] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState(0);

  useOnClickOutside(
    ref,
    () => {
      // event.preventDefault();
      props.setSidebarOpen(false);
    },
    props.sidebarOpen,
  );

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = useCallback(() => {
    const request = axios
      .get(`${import.meta.env.VITE_API_SERVER}/category/v1`)
      .then((response) => {
        if (response.data.success) {
          const total = { id: 0, name: '전체' };
          setCategories([total, ...response.data.data.category]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addCategory = useCallback(
    async (name: string) => {
      const body = {
        name,
      };
      return await axios
        .post(`${import.meta.env.VITE_API_SERVER}/category/v1`, body, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.data.success) {
            getCategories();
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    [categories, setCategories, getCategories],
  );

  const editCategory = useCallback(
    async (id: number, name: string) => {
      const body = {
        name,
      };
      return await axios
        .patch(`${import.meta.env.VITE_API_SERVER}/category/v1/${id}`, body, {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          if (response.data.success) {
            getCategories();
          }
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
    },
    [categories, setCategories, getCategories],
  );

  return (
    <div
      ref={ref}
      id="sidebar"
      className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-52 lg:w-52 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
        props.sidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}
    >
      {/* Sidebar header */}
      <div className="flex justify-between mb-10 pr-3 sm:px-2">
        {/* Close button */}
        <button
          className="lg:hidden text-slate-500 hover:text-slate-400"
          onClick={() => props.setSidebarOpen(!props.sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={props.sidebarOpen}
        >
          <span className="sr-only">Close sidebar</span>
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
      </div>
      <nav className="space-y-8">
        <div className="flex justify-between">
          <h3
            className="text-lg uppercase text-slate-400 font-semibold pl-3"
            tabIndex={3}
          >
            카테고리
          </h3>
          <AddCategoryButton
            categories={categories}
            setCategories={setCategories}
            addCategory={addCategory}
          />
        </div>
        <ol>
          {categories.map((item) => {
            return (
              <li
                className={`flex py-2 rounded-sm mb-0.5 last:mb-0 text-slate-200 text-xl ${
                  selected === item.id && 'bg-slate-900'
                }`}
                key={item.id}
              >
                {!editCategoryId || editCategoryId !== item.id ? (
                  <>
                    <button
                      className="w-full px-3 text-left overflow-hidden"
                      onClick={() => {
                        setSelected(item.id);
                      }}
                    >
                      {item.name}
                    </button>
                    {item.id !== 0 ? (
                      <CategoryOptionButton
                        setEditCategoryId={setEditCategoryId}
                        categoryId={item.id}
                      />
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <EditCategoryInput
                    categoryName={item.name}
                    setEditCategoryId={setEditCategoryId}
                    categoryId={item.id}
                    editCategory={editCategory}
                  />
                )}
              </li>
            );
          })}
          ;
        </ol>
      </nav>
    </div>
  );
};

export default Sidebar;
