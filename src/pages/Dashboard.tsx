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
import { isLink, getShortLink, saveLink } from '../utils/link';

const Dashboard = () => {
  const [note, onChangeNote, setNote] = useInput('');
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [top, setTop] = useState(true);
  const [contents, setContents] = useState<IContent[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Linklip Dashboard';
    getContents('');
  }, []);

  const getContents = (term: string) => {
    const request = axios
      .get(`/content/v1/link?term=${term}&pageNumber=0`)
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
      saveLink(note).then((res) => {
        if (res) {
          setNote('');
          getContents('');
        } else {
          let temp = {
            id: -1,
            url: note,
            linkImg: '',
            title: '',
            text: '',
          };
          setContents([temp, ...contents]);
        }
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
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header
          getContents={getContents}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="grid grid-cols-4 gap-2">
              {contents.map((item, idx) => {
                return (
                  <div key={idx}>
                    <a href={item.url} target="_blank">
                      <div className="max-h-28 overflow-y-hidden">
                        <img
                          className="min-w-full "
                          src={item.linkImg ? item.linkImg : logo}
                          alt="thumbnail"
                        />
                      </div>
                      <p>{item.title}</p>
                      <p>{item.text}</p>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
        <Notebox
          note={note}
          onChangeNote={onChangeNote}
          onSubmitHandler={onSubmitHandler}
        ></Notebox>
      </div>
    </div>
  );
};

export default Dashboard;
