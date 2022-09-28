import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginSuccessState } from '../stores/user';

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useRecoilState(loginSuccessState);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    console.log('accessToken', accessToken);
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      setLoginSuccess(true);
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }
    // navigate(`/dashboard`);
  }, []);

  return <></>;
};

export default Login;
