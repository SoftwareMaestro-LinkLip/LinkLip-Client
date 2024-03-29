import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header';
import { IContents } from '../typings/content';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import LinkCard from '../partials/cards/LinkCard';
import NoteCard from '../partials/cards/NoteCard';
import LinkModal from '../partials/modals/LinkModal';
import NoteModal from '../partials/modals/NoteModal';
import { getContents } from '../utils/content';
import { useRecoilState, useRecoilValue } from 'recoil';
import { contentsState } from '../stores/content';
import { requestAccessToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import {
  termState,
  curCategoryIdState,
  contentsSizeState,
  pageIdxState,
  modalOpenState,
  openedContentState,
  sidebarOpenState,
} from '../stores/dashboard';
import ImageCard from '../partials/cards/ImageCard';
import ImageModal from '../partials/modals/ImageModal';
import { getCategories } from '../utils/category';

const Dashboard = () => {
  const [bottom, setBottom] = useState(false);
  const [contents, setContents] = useRecoilState<IContents>(contentsState);
  const [pageIdx, setPageIdx] = useRecoilState(pageIdxState);
  const [term, setTerm] = useRecoilState(termState);
  const curCategoryId = useRecoilValue(curCategoryIdState);
  const [contentsSize, setContentsSize] = useRecoilState(contentsSizeState);
  const modalOpen = useRecoilValue(modalOpenState);
  const [openedContent, setOpenedContent] = useRecoilState(openedContentState);
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenState);
  const navigate = useNavigate();

  useEffect(() => {
    requestAccessToken().then((res) => {
      if (!res) {
        navigate(`/`);
      }

      getCategories(true).then((res) => {
        if (!res.length) {
          navigate(`/join`);
        }
      });
    });

    // change page title tag
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';

    // 페이지당 불러오는 컨텐츠 개수 설정
    // 화면 높이가 높을 수록 한 번에 더 많은 컨텐츠를 불러옴
    const scrollHeight = document.getElementById('pageContainer');
    const cardHeight = 208; // 기본 컨텐츠 카드 높이
    let cnt = (Math.floor(scrollHeight?.clientHeight! / cardHeight) + 1) * 4;

    if (cnt > 24) {
      setContentsSize(cnt);
    } else {
      cnt = 24;
    }
    getContents(cnt, curCategoryId, term).then((res) => {
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
    <div className="flex h-screen bg-bg_gray" id="pageContainer">
      {/* Dark effect on modal opened */}
      {modalOpen && (
        <div className="absolute h-screen w-screen bg-black opacity-50 z-50"></div>
      )}
      {/* Dark effect on sidebar opened */}
      {sidebarOpen && (
        <div className="absolute h-screen w-screen bg-black opacity-50 z-40"></div>
      )}
      {/* Side Bar */}
      <Sidebar />
      {/* Content area */}

      <div className="w-full overflow-y-scroll relative" onScroll={onScroll}>
        {/* Header */}
        <Header />
        {/* TextArea */}
        <Notebox />
        {/* Modal */}
        {modalOpen &&
          {
            link: <LinkModal content={openedContent} />,
            note: <NoteModal content={openedContent} />,
            image: <ImageModal content={openedContent} />,
          }[openedContent.type]}
        {/* Cards */}
        <main className="mt-10 h-auto pb-32">
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-3 px-4 sm:px-8 lg:px-10 py-8 w-full ">
            {contents.map(
              (item, idx) =>
                ({
                  link: <LinkCard key={idx} content={item} />,
                  note: <NoteCard key={idx} content={item} />,
                  image: <ImageCard key={idx} content={item} />,
                }[item.type]),
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
