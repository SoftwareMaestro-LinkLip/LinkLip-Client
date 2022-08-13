import axios, { AxiosResponse } from 'axios';

export const isURL = (url: string): boolean => {
  const regExp =
    /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  return regExp.test(url);
};

export const getFullURL = (url: string): string => {
  let res = url;
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    res = 'https://' + res;
  }
  return res;
};

export const getShortURL = (url: string): string => {
  // (https?:\/\/)?(www\.)?
  return url.replace(/(https?:\/\/)?(www\.)?/g, '');
};

export const parse = async (url: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    `${import.meta.env.VITE_API_PARSER}/link/v1?url=${getFullURL(url).replace(
      /^([^?#]*).*/,
      '$1',
    )}`,
  );

  if (response.status >= 400) {
    throw response;
  }

  // console.log(response.data);
  return response.data.data;
};

export default {
  isLink: isURL,
  getFullLink: getFullURL,
  getShortLink: getShortURL,
  parse: parse,
};
