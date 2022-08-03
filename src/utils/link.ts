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
    .post('/content/v1/link', body, {
      withCredentials: true,
    })
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
  const metas: any = html.match(/<meta[^>]+>/gim);
  const res = { linkImg: '', title: '', text: '' };

  if (metas) {
    const targets = ['og:image', 'og:title', 'og:description'];

    for (let meta of metas) {
      meta = meta.replace(/\s*\/?>$/, ' />');

      if (meta.includes('og:image')) {
        const startIdx = meta.indexOf('content="') + 9;
        const endIdx = meta.indexOf('"', startIdx + 9);
        res.linkImg = meta.slice(startIdx, endIdx);
      }

      if (meta.includes('og:title')) {
        const startIdx = meta.indexOf('content="') + 9;
        const endIdx = meta.indexOf('"', startIdx + 9);
        res.title = meta.slice(startIdx, endIdx);
      }

      if (meta.includes('og:description')) {
        const startIdx = meta.indexOf('content="') + 9;
        const endIdx = meta.indexOf('"', startIdx + 9);
        res.text = meta.slice(startIdx, endIdx);
      }
    }
  } else {
    const title = html
      .match(/<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim)[0]
      .replace(/<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim, '$1');
    res.title = title;
  }
  return res;
};

export default {
  isLink,
  getFullLink,
  getShortLink,
  saveLink,
};
