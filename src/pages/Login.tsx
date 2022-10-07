import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { serverAPIState } from '../stores/api';
import { useRecoilState } from 'recoil';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [serverAPI, setServerAPI] = useRecoilState(serverAPIState);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      setServerAPI(
        axios.create({
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }
    navigate(`/dashboard`);
  }, []);

  return <div>Login</div>;
};

export default Login;
