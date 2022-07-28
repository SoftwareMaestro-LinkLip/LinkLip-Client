import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContainer } from '../css/styled';
import NavBar from '../partials/Navbar';
import axios, { AxiosResponse } from 'axios';
import useInput from '../hooks/useInput';
import { IContent } from '../typings/types';
// import { fetch } from '../utils/fetch';
import { fetch } from 'fetch-opengraph';
import Notebox from '../partials/Notebox';

const Home = () => {
  const [note, onChangeNote, setNote] = useInput('');
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [top, setTop] = useState(true);
  const [contents, setContents] = useState<IContent[]>([]);

  useEffect(() => {
    getContents('');
    console.log('contents:', contents);
  }, []);

  const getContents = (term: string) => {
    const request = axios
      .get(`/content/v1/link?term=${term}`)
      .then((response) => {
        if (response.data.success) {
          setContents([...response.data.data.contents]);
        }
      })
      .catch((err) => console.log(err));
  };

  const saveURL = (url: string) => {
    let body = {
      url,
      linkImg: '',
      title: '',
      text: '',
    };

    const request = axios
      .post('content/v1/link', body)
      .then((response) => {
        if (response.data.success) {
          setNote('');
          getContents('');
        } else {
          let temp = {
            id: -1,
            url: note,
            linkImg: '',
            title: '',
          };
          setContents([temp, ...contents]);
        }
        return response.data;
      })
      .catch((err) => console.log(err));
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (note.startsWith('www.')) {
      saveURL('https://' + note);
    } else if (note.startsWith('https://')) {
      saveURL(note);
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <AppContainer>
        {show && <NavBar getContents={getContents} />}
        <ol className="list" onScroll={onScroll}>
          {!top && <NavBar getContents={getContents} />}

          {contents.map((item, idx) => {
            return (
              <li
                key={idx}
                className="card rounded-md shadow-lg text-gray-700 text-base bg-white bg-opacity-50"
              >
                <a href={item.url} target="_blank">
                  {item.url}
                </a>
              </li>
            );
          })}
        </ol>
        <Notebox
          note={note}
          onChangeNote={onChangeNote}
          onSubmitHandler={onSubmitHandler}
        ></Notebox>
      </AppContainer>
    </div>
  );
};

export default Home;
