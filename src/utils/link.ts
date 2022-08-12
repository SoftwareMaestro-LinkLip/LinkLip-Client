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

const stringToHTML = function (str: string) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, 'text/html');
  return doc.body;
};

export const getMetaData = async (url: string) => {
  const response: AxiosResponse<any> = await axios.get(
    getFullLink(url).replace(/^([^?#]*).*/, '$1'),
  );

  if (response.status >= 400) {
    throw response;
  }

  const res = { linkImg: '', title: '', text: '', url };
  const html = response.data;

  // res.text = html
  //   // .replaceAll(/<script[^>]*>[^<\/script>]*.*<\/script>/gim, '')
  //   // .replaceAll(/<script[^>]*>(\r?\n|\r)*.*<\/script>/gim, '')
  //   // .replaceAll(/<script[^>]*>(\r?\n|\r)*.*<\/script>/gim, '')
  //   .replaceAll(/<script[^>]*>(\r?\n|\r|.)*<\/script>/gim, '')
  //   .replaceAll(/<[^>]*>/gim, '')
  //   .replaceAll(/(  +)|(\r)|(\n)|(\t)|(\\+r)|(\\+n)|(\\+t)|/gim, '');

  res.text = stringToHTML(html).innerText.replaceAll(
    /(  +)|(\r)|(\n)|(\t)|(\\+r)|(\\+n)|(\\+t)|/gim,
    '',
  );

  const linkImgTags = html.match(/<meta[^>]+og:image[^>]+>/gim);

  if (!!linkImgTags.length) {
    // res.linkImg = linkImgTags[0].replace(/<meta[^content="]+content="/gim, '').replace(/"[^>]>/gim, '');
    const imgURLs = linkImgTags[0].match(
      /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
    );

    if (!!imgURLs) {
      res.linkImg = imgURLs[0];
    }
  }

  const titles = html.match(
    /<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim,
  );

  if (!!titles) {
    res.title = titles[0].replace(
      /<title[^>]*>[\r\n\t\s]*([^<]+)[\r\n\t\s]*<\/title>/gim,
      '$1',
    );
  }

  return res;
};

export default {
  isLink,
  getFullLink,
  getShortLink,
};
