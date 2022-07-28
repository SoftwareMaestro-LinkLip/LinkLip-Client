import logo from '../images/logo.png';
import '../css/style.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContainer, ContentsContainer } from '../css/Containers';
import NavBar from '../partials/Navbar';
import axios, { AxiosResponse } from 'axios';
import useInput from '../hooks/useInput';
import { IContent } from '../typings/types';
// import { fetch } from '../utils/fetch';
import { fetch } from 'fetch-opengraph';
import Notebox from '../partials/Notebox';
import { isLink, getFullLink, getShortLink } from '../utils/link';

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
    url = getFullLink(url);
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

    if (isLink(note)) {
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
      {contents.length === 0 && (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      )}

      <AppContainer>
        {show && <NavBar getContents={getContents} />}
        <ContentsContainer onScroll={onScroll}>
          {!top && <NavBar getContents={getContents} />}

          {contents.map((item, idx) => {
            return (
              <div key={idx}>
                <p>
                  <a href={item.url} target="_blank">
                    {getShortLink(item.url)}
                  </a>
                </p>
              </div>
            );
          })}
        </ContentsContainer>
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
