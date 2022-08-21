import { atom } from 'recoil';

export const termState = atom({
  key: 'termAtom',
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

export const sidebarOpenState = atom({
  key: 'sidebarOpenState',
  default: false,
});

export const modalOpenState = atom({
  key: 'modalOpenState',
  default: false,
});
