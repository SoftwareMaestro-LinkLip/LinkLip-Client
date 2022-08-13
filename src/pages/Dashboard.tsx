import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DashboadContainer, ContentsContainer } from '../css/Containers';
import Header from '../partials/Header';
import axios from 'axios';
import { IContent } from '../typings/types';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import { isURL, getShortURL } from '../utils/link';
import apiServer from '../utils/api';
import useInput from '../hooks/useInput';
import LinkCard from '../partials/LinkCard';

const Dashboard = () => {
  const [bottom, setBottom] = useState(false);
  const [contents, setContents] = useState<IContent[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const contentsSize = 12;
  const [term, onChangeTerm] = useInput('');

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';
    getContents();
  }, []);

  useEffect(() => {
    if (bottom) {
      getContents();
      setBottom(false);
    }
  }, [bottom]);

  const getContents = useCallback(() => {
    const request = axios
      .get(
        `${
          import.meta.env.VITE_API_SERVER
        }/content/v1/link?term=${term}&page=${page}&size=${contentsSize}`,
      )
      .then((response) => {
        if (response.data.success) {
          if (page > 0) {
            setContents([...contents, ...response.data.data.pageDto.content]);
          } else {
            setContents([...response.data.data.pageDto.content]);
          }
          if (response.data.data.pageDto.content.length === contentsSize) {
            setPage(page + 1);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [page, setContents, contents]);

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
      <div className="w-full">
        {/* Header */}
        <Header
          getContents={getContents}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setPage={setPage}
          onChangeTerm={onChangeTerm}
          term={term}
        />
        {/* Cards */}
        <main onScroll={onScroll} className="mt-10 h-auto pb-32">
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-8 w-full ">
            {contents.map((item, idx) => {
              return (
                <LinkCard key={idx} content={item} getContents={getContents} />
              );
            })}
          </div>
        </main>
        {/* TextArea */}
        <Notebox
          setPage={setPage}
          getContents={getContents}
          sidebarOpen={sidebarOpen}
        ></Notebox>
      </div>
    </div>
  );
};

export default Dashboard;
