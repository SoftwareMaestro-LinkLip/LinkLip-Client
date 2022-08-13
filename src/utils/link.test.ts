import { isURL, getShortURL } from './link';

describe('Link function', () => {
  test('it should be a link if the input starts with https', () => {
    expect(isURL('https://swmaestro.org')).toBe(true);
    expect(isURL('https://news.naver.com')).toBe(true);
    expect(isURL('https://helloworld.com')).toBe(true);
  });

  test('convert to short version of the url', () => {
    expect(getShortURL('https://www.naver.com')).toMatch('naver.com');
    expect(getShortURL('www.naver.com')).toMatch('naver.com');
    expect(() => {
      getShortURL('naver.com');
    }).toBe('naver.com');
  });
});
