import { isLink } from './link';

describe('Link function', () => {
  test('it should be a link if the input starts with https', () => {
    expect(isLink('https://swmaestro.org')).toBe(true);
    expect(isLink('https://news.naver.com')).toBe(true);
    expect(isLink('https://hello_world')).toBe(true);
  });

  test('it should be a link if the input starts with http', () => {
    expect(isLink('http://www.swmaestro.org')).toBe(true);
    expect(isLink('http://news.naver.com')).toBe(true);
    expect(isLink('http://hello_world')).toBe(true);
  });

  test('it should be a link if the input starts with www', () => {
    expect(isLink('www.swmaestro')).toBe(true);
    expect(isLink('www.naver')).toBe(true);
    expect(isLink('www.hello_world')).toBe(true);
  });

  test('it should be a link if the input contains with known texts', () => {
    expect(isLink('swmaestro.com/a/b/c')).toBe(true);
    expect(isLink('swmaestro.org/a/b/c')).toBe(true);
    expect(isLink('swmaestro.kr/a/b/c')).toBe(true);
    expect(isLink('swmaestro.io/a/b/c')).toBe(true);
  });

  test('it should not be a link', () => {
    expect(isLink('swmaestro.ue')).toBe(false);
    expect(isLink('naver.')).toBe(false);
    expect(isLink('hello_world')).toBe(false);
  });
});
