import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { jwtState } from '../stores/user';

const Login = () => {
  const { jwt } = useParams();
  const setJwt = useSetRecoilState(jwtState);
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt) {
      setJwt(jwt);
    }
    navigate(`/dashboard`);
  }, []);

  return <></>;
};

export default Login;
