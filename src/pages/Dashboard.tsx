import '../css/style.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import { IContent } from '../typings/types';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import useInput from '../hooks/useInput';
import LinkCard from '../partials/LinkCard';
import { getContents } from '../utils/content';

const Dashboard = () => {
  const [bottom, setBottom] = useState(false);
  const [contents, setContents] = useState<IContent[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageIdx, setPageIdx] = useState(0);
  const [term, onChangeTerm] = useInput('');
  const [categoryId, setCategoryId] = useState(0);
  const [contentsSize, setContentsSize] = useState(12);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';
    const scrollHeight = document.getElementById('pageContainer');
    const cardHeight = 208;
    //13rem/* 208px
    console.log(scrollHeight?.clientHeight);
    let cnt = (Math.floor(scrollHeight?.clientHeight! / cardHeight) + 1) * 4;

    if (cnt > 12) {
      setContentsSize(cnt);
    } else {
      cnt = 12;
    }
    getContents(term, 0, categoryId, cnt).then((res) => {
      console.log(res);
      setContents([...res]);
    });

    // if (
    //   scrollHeight?.clientHeight &&
    //   scrollHeight?.clientHeight <= cardHeight * 4
    // ) {
    //   getContents(term).then((res) => {
    //     setContents([...contents, ...res]);
    //   });
    // } else {
    //   getContents(term, 0, categoryId, 24).then((res) => {
    //     setContents([...contents, ...res]);
    //     setPageIdx(1);
    //   });
    // }
    // console.log(contents);
  }, []);

  useEffect(() => {
    if (bottom) {
      getContents(term, pageIdx + 1).then((res) => {
        setContents([...contents, ...res]);
        setPageIdx(pageIdx + 1);
        setBottom(false);
      });
    }
  }, [bottom, pageIdx]);

  const onScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    let scroll = scrollHeight - scrollTop - clientHeight;
    if (scroll < 10) {
      setBottom(true);
    }
  };

  return (
    <div className="flex h-screen ">
      {/* Side Bar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div
        className="w-full overflow-y-scroll"
        id="pageContainer"
        onScroll={onScroll}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setPage={setPageIdx}
          setContents={setContents}
          term={term}
          onChangeTerm={onChangeTerm}
          contentsSize={contentsSize}
        />
        {/* Cards */}
        <main className="mt-10 h-auto pb-32">
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-8 w-full ">
            {contents.map((item, idx) => {
              return (
                <LinkCard key={idx} content={item} setContents={setContents} />
              );
            })}
          </div>
        </main>
        {/* TextArea */}
        <Notebox
          setPage={setPageIdx}
          sidebarOpen={sidebarOpen}
          setContents={setContents}
          contents={contents}
          contentsSize={contentsSize}
        ></Notebox>
      </div>
    </div>
  );
};

export default Dashboard;
