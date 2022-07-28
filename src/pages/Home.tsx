import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../partials/Navbar';
import axios, { AxiosResponse } from 'axios';
import useInput from '../hooks/useInput';
import { IContent } from '../typings/types';
import { fetch } from '../utils/fetch';

const Home = () => {
  const [arr, setArr] = useState<string[]>([]);
  const [note, onChangeNote] = useInput('');
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

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let body = {
      url: note,
      linkImg: '',
      title: '',
      text: '',
    };

    const request = axios
      .post('content/v1/link', body)
      .then((response) => {
        if (response.data.success) {
          getContents('');
        } else {
          let temp = {
            id: -1,
            url: note,
            linkImg: '',
            title: '',
          };
          setContents([temp, ...contents]);
          console.log(response.data.message);
        }
        return response.data;
      })
      .catch((err) => console.log(err));
  };

  const onTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    onChangeNote(e.target.value);
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
        <p className="mt-12 font-medium">Vite + React + TypeScript + PWA</p>
      </header>
      <div className="container1">
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
        <form className="inputbox rounded-3xl" onSubmit={onSubmitHandler}>
          <input
            onChange={onTextHandler}
            type="text"
            className="
        form-control
        w-full
        h-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:outline-none
      "
            placeholder="Input URL"
            value={note}
          />
          <button
            type="submit"
            className="px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
