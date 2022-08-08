import React, {
  useState,
  useEffect,
  useRef,
  FunctionComponent,
  Dispatch,
} from 'react';
import { ICategory } from '../typings/types';
import { SidebarContainer } from '../css/Containers';

interface IProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: FunctionComponent<IProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selected, setSelected] = useState(0);

  //   // close on click outside
  //   useEffect(() => {
  //     const clickHandler = ({ target }) => {
  //       if (!sidebar.current || !trigger.current) return;
  //       if (
  //         !sidebarOpen ||
  //         sidebar.current.contains(target) ||
  //         trigger.current.contains(target)
  //       ) {
  //         return;
  //       }
  //       setSidebarOpen(false);
  //     };
  //     document.addEventListener('click', clickHandler);
  //     return () => document.removeEventListener('click', clickHandler);
  //   });

  //   // close if the esc key is pressed
  //   useEffect(() => {
  //     const keyHandler = ({ keyCode }) => {
  //       if (!sidebarOpen || keyCode !== 27) return;
  //       setSidebarOpen(false);
  //     };
  //     document.addEventListener('keydown', keyHandler);
  //     return () => document.removeEventListener('keydown', keyHandler);
  //   });

  //   useEffect(() => {
  //     localStorage.setItem('sidebar-expanded', sidebarExpanded);
  //     if (sidebarExpanded) {
  //       document.querySelector('body')!.classList.add('sidebar-expanded');
  //     } else {
  //       document.querySelector('body')!.classList.remove('sidebar-expanded');
  //     }
  //   }, [sidebarExpanded]);

  useEffect(() => {
    const total = { id: 0, name: '전체' };
    setCategories([
      total,
      { id: 1, name: '음악' },
      { id: 2, name: '게임' },
      { id: 3, name: '공부' },
    ]);
  }, []);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-50 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
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
          <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
            카테고리
          </h3>
          <ol>
            {categories.map((item) => {
              return (
                <li
                  className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 text-slate-200 ${
                    selected === item.id && 'bg-slate-900'
                  }`}
                  key={item.id}
                >
                  {item.name}
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
