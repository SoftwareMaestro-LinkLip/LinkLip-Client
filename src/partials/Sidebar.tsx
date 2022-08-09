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
import axios from 'axios';

interface IProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FunctionComponent<IProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const ref = useRef(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selected, setSelected] = useState(0);

  useOnClickOutside(
    ref,
    (event) => {
      // event.preventDefault();
      setSidebarOpen(false);
    },
    sidebarOpen,
  );

  useEffect(() => {
    const total = { id: 0, name: '전체' };

    const arr = [];
    for (let i = 1; i < 3; i++) {
      arr.push({ id: i, name: 'test' });
    }
    setCategories([total, ...arr]);
  }, []);

  const getCategories = useCallback(() => {
    const request = axios
      .get(`/category/v1`)
      .then((response) => {
        if (response.data.success) {
          setCategories([...response.data.data.category]);
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
        .post('/category/v1', body, {
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
    <div>
      <div
        ref={ref}
        id="sidebar"
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-52 lg:w-52 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
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
            <h3 className="text-lg uppercase text-slate-500 font-semibold pl-3">
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
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 text-slate-200 text-xl ${
                    selected === item.id && 'bg-slate-900'
                  }`}
                  key={item.id}
                >
                  <button
                    className="w-full text-left"
                    onClick={() => {
                      setSelected(item.id);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
            ;
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;