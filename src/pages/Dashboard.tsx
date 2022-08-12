import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DashboadContainer, ContentsContainer } from '../css/Containers';
import Header from '../partials/Header';
import axios from 'axios';
import useInput from '../hooks/useInput';
import { IContent } from '../typings/types';
import Notebox from '../partials/Notebox';
import Sidebar from '../partials/Sidebar';
import { isLink, getShortLink, getMetaData } from '../utils/link';
import apiServer from '../utils/api';

const Dashboard = () => {
  const [note, onChangeNote, setNote] = useInput('');
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [top, setTop] = useState(true);
  const [contents, setContents] = useState<IContent[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // console.log('api url', import.meta.env.VITE_API_URL);

    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';
    getContents('');
  }, []);

  const getContents = (term: string) => {
    // const request = apiServer
    //   .get('/content/v1/link?term=${term}&pageNumber=0')
    //   .then((response) => {
    //     if (response.data.success) {
    //       setContents([...response.data.data.pageDto.content]);
    //       // setTerm(term);
    //     }
    //   })
    //   .catch((err) => console.log(err));

    const request = axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/content/v1/link?term=${term}&pageNumber=0`,
      )
      .then((response) => {
        if (response.data.success) {
          setContents([...response.data.data.pageDto.content]);
          // setTerm(term);
        }
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLink(note)) {
      getMetaData(note).then((body) => {
        // ============
        console.log('body:', body);
        // ============
        axios
          .post(`${import.meta.env.VITE_API_URL}/content/v1/link`, body, {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          })
          .then((response) => {
            setNote('');
            getContents('');
          })
          .catch((err) => {
            console.log(err);
            return false;
          });
      });
    }
  };

  const onScroll = (e: any) => {
    // console.log(e.target.clientHeight);
    // console.log('scroll detected!');

    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const scroll = scrollHeight - scrollTop - clientHeight;

    if (scrollTop === 0) {
      setTop(true);
    } else {
      setTop(false);
    }

    if (lastY < scroll) {
      setShow(true);
    } else if (lastY > scroll) {
      setShow(false);
    }
    setLastY(scroll);
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
        />

        <main className="mt-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-4 sm:px-6 lg:px-8 py-8 w-full mb-36">
            {contents.map((item, idx) => {
              return (
                <div className="flex justify-center" key={idx}>
                  <div className="block p-6 rounded-lg shadow-lg bg-white max-h-40">
                    <div className="h-2/3 overflow-y-hidden">
                      <a href={item.url} target="_blank">
                        <img
                          className="w-full "
                          src={item.linkImg ? item.linkImg : logo}
                          alt="item.title"
                        />
                      </a>
                    </div>
                    <div className="h-1/3 overflow-hidden mt-4">
                      <a href={item.url} target="_blank">
                        <p>{item.title}</p>
                        <p>{item.text}</p>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        <Notebox
          note={note}
          onChangeNote={onChangeNote}
          onSubmitHandler={onSubmitHandler}
          sidebarOpen={sidebarOpen}
        ></Notebox>
      </div>
    </div>
  );
};

export default Dashboard;
