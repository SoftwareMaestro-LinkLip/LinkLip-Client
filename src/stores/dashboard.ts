import { atom, RecoilState } from 'recoil';
import { ILinkContent, INoteContent } from '../typings/content';

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

export const openedContentState: RecoilState<ILinkContent | INoteContent> =
  atom<ILinkContent | INoteContent>({
    key: 'openedContentState',
    default: {
      id: 0,
      url: '',
      linkImg: '',
      title: '',
      text: '',
      category: null,
      type: 'note',
    },
  });
