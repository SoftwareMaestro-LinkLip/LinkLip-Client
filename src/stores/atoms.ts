import { atom, RecoilState } from 'recoil';
import { ILinkContent } from '../typings/types';

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

export const contentsState: RecoilState<ILinkContent[]> = atom<ILinkContent[]>({
  key: 'contentsState',
  default: [],
});

export const sidebarOpenState = atom({
  key: 'sidebarOpenState',
  default: false,
});

export const dashboardInfoAtom = atom({
  key: 'dashboardInfoAtom',
  default: {
    contentsSize: 12,
    pageIdx: 0,
  },
});
