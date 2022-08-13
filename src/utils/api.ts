import axios from 'axios';

const proxy = import.meta.env.DEV
  ? {
      host: 'localhost',
      port: 8080,
    }
  : false;

const apiServer = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  proxy: proxy,
});

export default apiServer;
