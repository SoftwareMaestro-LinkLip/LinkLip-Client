import { atom, RecoilState } from 'recoil';
import { ILinkContent } from '../typings/types';

export const termState = atom({
  key: 'termAtom',
  default: '',
});

export const curCategoryIdState = atom<number | null>({
  key: 'curCategoryIdState',
  default: null,
});

export const contentsSizeState = atom({
  key: 'contentsSizeState',
  default: 24,
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

export const openedContentState: RecoilState<ILinkContent> = atom<ILinkContent>(
  {
    key: 'openedContentState',
    default: {
      id: 0,
      url: '',
      linkImg: '',
      title: '',
      text: '',
      categoryId: null,
    },
  },
);
