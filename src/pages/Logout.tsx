import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('accessToken', JSON.stringify(null));
    localStorage.setItem('refreshToken', JSON.stringify(null));

    navigate(`/`);
  }, []);

  return <div>Logout</div>;
};

export default Logout;
