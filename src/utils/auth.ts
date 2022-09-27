import axios, { AxiosRequestHeaders } from 'axios';

export const authHeader = (): AxiosRequestHeaders | undefined => {
  const temp = localStorage.getItem('jwt');
  if (temp) {
    const jwt = JSON.parse(temp);
    return { Authorization: 'Bearer ' + jwt };
  } else {
    return undefined;
  }
};
