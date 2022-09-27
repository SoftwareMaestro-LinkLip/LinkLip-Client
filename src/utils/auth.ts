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
    return {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzb2NpYWxJZCI6IkdPT0dMRV8xMTA3MDI1OTA5MjA4MDU5Mzk4MzciLCJpYXQiOjE2NjQyODU4NTMsImV4cCI6MTY2NDI5MzA1M30.qTqYcoFZ0l6w2_fER2s9idDp59PgWgqIkM5IMcX-Sjo`,
      'Content-Type': 'application/json',
    };
    // return { 'Content-Type': 'application/json' };
  }
};
