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
    navigate(`/dashboard`);
  }, []);

  return <div>Login</div>;
};

export default Login;
