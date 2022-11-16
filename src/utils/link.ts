import axios, { AxiosResponse } from 'axios';

/**
 * 문자열이 URL인지 체크하는 함수
 * @param {string} url
 * @returns {boolean}
 */
export const isURL = (url: string): boolean => {
  if (/[\s]/g.test(url)) {
    return false;
  }
  const regExp =
    /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/y;
  if (regExp.test(url)) {
    return true;
  }
  return false;
};

/**
 * https 포함된 URL로 변환하는 함수
 * @param {string} url
 * @returns {string}
 */
export const getFullURL = (url: string): string => {
  let res = url;
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    res = 'https://' + res;
  }
  return res;
};

/**
 * 사용자 보여주기용 url 변환 함수
 * @param {string} url
 * @returns {string}
 */
export const getShortURL = (url: string): string => {
  return url.replace(/(https?:\/\/)?(www\.)?/g, '');
};

/**
 * 링크 데이터 불러오는 함수
 * @param {string} url
 * @returns {Promise<any>}
 */
export const parse = async (url: string): Promise<any> => {
  const body = { url: decodeURIComponent(url) };
  const response: AxiosResponse<any> = await axios.post(
    `${import.meta.env.VITE_API_PARSER}/link/v1`,
    body,
  );

  if (response.status >= 400) {
    console.log('response failed');
    throw response;
  }

  const res = response.data.data;

  if (!res.title) {
    res.title = getDomainName(url);
  }

  return res;
};

/**
 *
 * @param {string} url
 * @returns {string}
 */
export const getDomainName = (url: string): string => {
  const domain = new URL(url).hostname.replace(/(https?:\/\/)?(www\.)?/y, '');

  return domain;
};
