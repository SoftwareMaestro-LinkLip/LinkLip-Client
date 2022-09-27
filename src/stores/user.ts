import { atom } from 'recoil';
import { ILinkContent, INoteContent } from '../typings/content';

export const jwtState = atom<string | null>({
  key: 'jwtState',
  default: null,
});
