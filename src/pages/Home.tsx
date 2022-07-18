import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../partials/Navbar';

const Home = () => {
  const [arr, setArr] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (text) {
      let temp = [...arr];
      temp.push(text);
      setArr(temp);
      setText('');
    }

    // let dataToSubmit = {
    //   url: URL;
    // };

    // const request = axios.post("/api/conents", body).then((response) => {
    //   console.log(response.data);
    //   return response.data;
    // });
  };

  const onTextHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onScroll = (e: any) => {
    // console.log(e.target.clientHeight);
    // console.log('scroll detected!');

    const { scrollHeight, scrollTop, clientHeight } = e.target;
    const scroll = scrollHeight - scrollTop - clientHeight;

    if (lastY < scroll) {
      setShow(true);
    } else {
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
        {show && <Navbar />}
        <ol className="list" onScroll={onScroll}>
          {arr.map((item, idx) => {
            return (
              <li
                key={idx}
                className="card rounded-md shadow-lg text-gray-700 text-base bg-white bg-opacity-50"
              >
                <a href={item} target="_blank">
                  {item}
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
            value={text}
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
