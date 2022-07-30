import axios, { AxiosResponse } from 'axios';

export const isLink = (url: string): boolean => {
  const prefixes = ['https://', 'http://', 'www.'];
  const postfixes = ['.com', '.net', '.org', '.kr', '.io'];

  for (let prefix of prefixes) {
    if (url.startsWith(prefix)) {
      return true;
    }
  }

  for (let postfix of postfixes) {
    if (url.includes(postfix)) {
      return true;
    }
  }

  return false;
};

export const getFullLink = (url: string): string => {
  let res = url;
  if (!url.startsWith('https://') || !url.startsWith('https://')) {
    res = 'https://' + res;
  }
  return res;
};

export const getShortLink = (url: string): string => {
  return url.replace('https://', '');
};

export const saveLink = async (url: string): Promise<any> => {
  let body = await getMetaData(getFullLink(url));
  // ============
  console.log('body:', body);
  // ============
  return await axios
    .post('content/v1/link', body)
    .then((response) => response.data.success)
    .catch((err) => {
      console.log(err);
      return false;
    });
};

export const getMetaData = async (url: string) => {
  const response: AxiosResponse<any> = await axios.get(
    url.replace(/^([^?#]*).*/, '$1'),
  );

  if (response.status >= 400) {
    throw response;
  }

  const html = response.data;
  const title = html
    .match(/<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim)[0]
    .replace(/<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim, '$1');

  const imgTags = html.match(/property="og:image"[^>]*>/gim);
  let linkImg = imgTags
    ? imgTags[0]
        .replace(`property="og:image" content="`, '')
        .replace(' ', '')
        .replace(`">`, '')
        .replace(`"/>`, '')
    : '';
  // let texts = html.match(/<p[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/p>/gim);

  // if (texts) {
  //   texts = texts.map((text: string) => {
  //     return text.replace(
  //       /<p[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/p>/gim,
  //       '$1',
  //     );
  //   });
  // }
  // console.log('text', texts ? texts.join(' ') : '');
  const descs = html.match(/property="og:description"[^>]*>/gim);
  const desc = descs
    ? descs[0]
        .replace(`property="og:description" content="`, '')
        .replace(`/>`, '')
    : '';

  return {
    url,
    title: title || '',
    linkImg: linkImg || '',
    text: desc || '',
  };
};

export default {
  isLink,
  getFullLink,
  getShortLink,
  saveLink,
};
