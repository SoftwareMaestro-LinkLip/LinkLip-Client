import axios, { AxiosResponse } from 'axios';

export const isLink = (url: string): boolean => {
  const regExp =
    /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  return regExp.test(url);
};

export const fetch = async (url: string): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    url.replace(/^([^?#]*).*/, '$1'),
  );

  return response.data;
};

export const getFullLink = (url: string): string => {
  let res = url;
  if (!url.startsWith('https://') && !url.startsWith('http://')) {
    res = 'https://' + res;
  }
  return res;
};

export const getShortLink = (url: string): string => {
  // (https?:\/\/)?(www\.)?
  return url.replace(/(https?:\/\/)?(www\.)?/g, '');
};

export const getMetaData = async (url: string) => {
  const response: AxiosResponse<any> = await axios.get(
    getFullLink(url).replace(/^([^?#]*).*/, '$1'),
  );

  if (response.status >= 400) {
    throw response;
  }

  const html = response.data;

  const metas: any = html.match(/<meta[^>]+>/gim);
  const res = { linkImg: '', title: '', text: '', url };

  if (!!metas) {
    for (let meta of metas) {
      meta = meta.replace(/\s*\/?>$/, ' />');

      if (meta.includes('og:image')) {
        const startIdx = meta.indexOf('content="') + 9;
        const endIdx = meta.indexOf('"', startIdx + 9);
        let imgURL = meta.slice(startIdx, endIdx);

        // if (!res.linkImg && isLink(imgURL)) {
        //   fetch(imgURL).then((response) => {
        //     if (response) {
        //       console.log('response: ', res);
        //       res.linkImg = imgURL;
        //     }
        //   });
        // }
        if (!res.linkImg && isLink(imgURL)) {
          res.linkImg = imgURL;
        }
        // res.linkImg = isLink(imgURL) ? imgURL : '';
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

      if (!!res.linkImg && !!res.title && !!res.text) {
        break;
      }
    }
  } else {
    let title = html.match(
      /<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim,
    );

    if (!!title) {
      title = title[0].replace(
        /<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim,
        '$1',
      );
    }
    res.title = !!title ? title : '';
  }

  return res;
};

export default {
  isLink,
  getFullLink,
  getShortLink,
};
