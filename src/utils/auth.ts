import axios, { AxiosRequestHeaders } from 'axios';

export const getAuthHeader = (): AxiosRequestHeaders | undefined => {
  const temp = localStorage.getItem('accessToken');
  if (temp) {
    const accessToken = JSON.parse(temp);
    console.log('accessToken', accessToken);
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return undefined;
  }
};
