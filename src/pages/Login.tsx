import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginSuccessState } from '../stores/user';

const Login = () => {
  const { jwt } = useParams();
  const setLoginSuccess = useSetRecoilState(loginSuccessState);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', JSON.stringify(jwt));
      setLoginSuccess(true);
    }
    navigate(`/dashboard`);
  }, []);

  return <></>;
};

export default Login;
