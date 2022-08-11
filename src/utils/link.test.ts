import { isLink, getShortLink } from './link';

describe('Link function', () => {
  test('it should be a link if the input starts with https', () => {
    expect(isLink('https://swmaestro.org')).toBe(true);
    expect(isLink('https://news.naver.com')).toBe(true);
    expect(isLink('https://helloworld.com')).toBe(true);
  });

  test('convert to short version of the url', () => {
    expect(getShortLink('https://www.naver.com')).toMatch('naver.com');
    expect(getShortLink('www.naver.com')).toMatch('naver.com');
    expect(() => {
      getShortLink('naver.com');
    }).toBe('naver.com');
  });
});
