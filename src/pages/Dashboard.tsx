import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DashboadContainer, ContentsContainer } from '../css/Containers';
import Header from '../partials/Header';
import axios from 'axios';
import { IContent } from '../typings/types';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import { isLink, getShortLink, getMetaData } from '../utils/link';
import apiServer from '../utils/api';
import useInput from '../hooks/useInput';

const Dashboard = () => {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [top, setTop] = useState(true);
  const [bottom, setBottom] = useState(false);
  const [contents, setContents] = useState<IContent[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const contentsSize = 12;
  const [term, onChangeTerm] = useInput('');

  useEffect(() => {
    // console.log('api url', import.meta.env.VITE_API_URL);

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

  const getContents = () => {
    if (page < 0) {
      return;
    }

    const request = axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/content/v1/link?term=${term}&page=${page}&size=${contentsSize}`,
      )
      .then((response) => {
        if (response.data.success) {
          // setContents([...response.data.data.pageDto.content]);
          console.log('==== page', page, '=======');
          console.log(response.data.data.pageDto.content);
          if (page > 0) {
            setContents([...contents, ...response.data.data.pageDto.content]);
          } else {
            setContents([...response.data.data.pageDto.content]);
          }
          if (response.data.data.pageDto.content.length === contentsSize) {
            setPage(page + 1);
          } else {
            setPage(-1);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const onScroll = (e: any) => {
    // console.log(e.target.clientHeight);
    // console.log('scroll detected!');

    const { scrollHeight, scrollTop, clientHeight } = e.target;
    let scroll = scrollHeight - scrollTop - clientHeight;

    if (scroll < 10) {
      setBottom(true);
    }

    // console.log('scroll:', scroll);
    // console.log('scrollTop:', scrollTop);
    // console.log('scrollHeight:', scrollHeight);
    // console.log('clientHeight:', clientHeight);
    // if (scrollTop === 0) {
    //   setTop(true);
    // } else {
    //   setTop(false);
    // }

    // if (lastY < scroll) {
    //   setShow(true);
    // } else if (lastY > scroll) {
    //   setShow(false);
    // }
    // setLastY(scroll);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* {contents.length === 0 && (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      )} */}

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

        <main onScroll={onScroll} className="mt-10 h-screen overflow-scroll">
          <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-8 w-full mb-36 ">
            {contents.map((item, idx) => {
              return (
                <div
                  className="flex overflow-hidden rounded-lg shadow-lg bg-white h-52 w-full"
                  key={idx}
                >
                  <div className="flex flex-col w-full">
                    <a
                      href={item.url}
                      target="_blank"
                      className=" flex justify-center w-full h-2/3 overflow-hidden"
                    >
                      <img
                        className=" block my-0 mx-auto w-full object-cover"
                        src={item.linkImg ? item.linkImg : logo}
                        alt="item.title"
                      />
                    </a>

                    <a
                      href={item.url}
                      target="_blank"
                      className=" mx-2 mt-2 break-all h-8 overflow-hidden text-ellipsis"
                    >
                      {item.title}
                    </a>
                    <a
                      href={item.url}
                      target="_blank"
                      className="text-slate-400 mx-2 my-2 break-all h-4 overflow-hidden"
                    >
                      {getShortLink(item.url)}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
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
