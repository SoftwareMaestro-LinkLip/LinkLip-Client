import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginSuccessState } from '../stores/user';

const Login = () => {
  const { accessToken } = useParams();
  const [loginSuccess, setLoginSuccess] = useRecoilState(loginSuccessState);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      setLoginSuccess(true);
    }
    // navigate(`/dashboard`);
  }, []);

  return <></>;
};

export default Login;
