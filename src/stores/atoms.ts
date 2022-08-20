import { atom, RecoilState } from 'recoil';
import { ILinkContent, ICategory } from '../typings/types';

export const termAtom = atom({
  key: 'termAtom',
  default: '',
});

export const curCategoryIdAtom = atom({
  key: 'curCategoryIdAtom',
  default: 0,
});

export const contentsSizeAtom = atom({
  key: 'contentsSizeAtom',
  default: 12,
});

export const pageIdxAtom = atom({
  key: 'pageIdxAtom',
  default: 0,
});

export const contentsAtom: RecoilState<ILinkContent[]> = atom<ILinkContent[]>({
  key: 'contentsAtom',
  default: [],
});

export const sidebarOpenAtom = atom({
  key: 'sidebarOpenAtom',
  default: false,
});

export const categoriesAtom: RecoilState<ICategory[]> = atom<ICategory[]>({
  key: 'categoriesAtom',
  default: [],
});

export const editCategoryIdAtom = atom({
  key: 'editCategoryIdAtom',
  default: 0,
});

export const dashboardInfoAtom = atom({
  key: 'dashboardInfoAtom',
  default: {
    contentsSize: 12,
    pageIdx: 0,
  },
});
