import axios, { AxiosRequestHeaders } from 'axios';

export const authHeader = (): AxiosRequestHeaders | undefined => {
  const temp = localStorage.getItem('jwt');
  if (temp) {
    const jwt = JSON.parse(temp);
    console.log('jwt', jwt);
    return { Authorization: 'Bearer ' + jwt };
  } else {
    return undefined;
  }
};
