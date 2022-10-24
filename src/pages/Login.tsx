import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken));
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
    }

    // 개발 환경 이동을 위한 로그 출력
    const devURL = `http://localhost:3000/oauth2/redirect/?accessToken=${accessToken}&refreshToken=${refreshToken}`;
    console.log(devURL);

    navigate(`/dashboard`);
  }, []);

  return <div>Login</div>;
};

export default Login;
