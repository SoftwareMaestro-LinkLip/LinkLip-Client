import '../css/style.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import { ILinkContent } from '../typings/types';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import LinkCard from '../partials/LinkCard';
import { getContents } from '../utils/content';
import { useRecoilState, useRecoilValue, RecoilState } from 'recoil';
import {
  termState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
  contentsState,
  sidebarOpenState,
} from '../stores/atoms';

const Dashboard = () => {
  const [bottom, setBottom] = useState(false);
  const [contents, setContents] = useRecoilState<ILinkContent[]>(contentsState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const term = useRecoilValue(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const [contentsSize, setContentsSize] = useRecoilState(contentsSizeState);

  useEffect(() => {
    // change page title tag
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';

    // 페이지당 불러오는 컨텐츠 개수 설정
    // 화면 높이가 높을 수록 한 번에 더 많은 컨텐츠를 불러옴
    const scrollHeight = document.getElementById('pageContainer');
    const cardHeight = 208; // 기본 컨텐츠 카드 높이
    let cnt = (Math.floor(scrollHeight?.clientHeight! / cardHeight) + 1) * 4;
    if (cnt > 12) {
      setContentsSize(cnt);
    } else {
      cnt = 12;
    }
    getContents(cnt, curCategoryId, term).then((res) => {
      setContents([...res]);
    });
  }, []);

  useEffect(() => {
    getContents(contentsSize, curCategoryId, term).then((res) => {
      setContents([...res]);
    });
  }, [curCategoryId]);

  useEffect(() => {
    if (bottom) {
      getContents(contentsSize, curCategoryId, term, pageIdx + 1).then(
        (res) => {
          setContents([...contents, ...res]);
          setPageIdx(pageIdx + 1);
          setBottom(false);
        },
      );
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
      <Sidebar />
      {/* Content area */}
      <div
        className="w-full overflow-y-scroll"
        id="pageContainer"
        onScroll={onScroll}
      >
        {/* Header */}
        <Header />
        {/* Cards */}
        <main className="mt-10 h-auto pb-32">
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-8 w-full ">
            {contents.map((item, idx) => {
              return <LinkCard key={idx} content={item} />;
            })}
          </div>
        </main>
        {/* TextArea */}
        <Notebox />
      </div>
    </div>
  );
};

export default Dashboard;
