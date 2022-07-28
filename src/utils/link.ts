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

export default {
  isLink,
  getFullLink,
  getShortLink,
};
