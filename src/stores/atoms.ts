import { atom } from 'recoil';

export const termState = atom({
  key: 'termState',
  default: '',
});

export const curCategoryIdState = atom({
  key: 'curCategoryIdState',
  default: 0,
});

export const contentsSizeState = atom({
  key: 'contentsSizeState',
  default: 12,
});

export const pageIdxState = atom({
  key: 'pageIdxState',
  default: 0,
});

export const dashboardInfoAtom = atom({
  key: 'dashboardInfoAtom',
  default: {
    contentsSize: 12,
    pageIdx: 0,
  },
});
