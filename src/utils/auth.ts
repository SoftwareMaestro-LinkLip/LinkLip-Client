import axios, { AxiosRequestHeaders } from 'axios';

export const authHeader = (): AxiosRequestHeaders => {
  const temp = localStorage.getItem('accessToken');
  if (temp) {
    const accessToken = JSON.parse(temp);
    console.log('accessToken', accessToken);
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  } else {
    return { 'Content-Type': 'application/json' };
  }
};
