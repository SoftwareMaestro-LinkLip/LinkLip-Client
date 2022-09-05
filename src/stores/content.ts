import { atom, RecoilState } from 'recoil';
import { ILinkContent, INoteContent, IContents } from '../typings/content';

export const contentsState: RecoilState<IContents> = atom<IContents>({
  key: 'contentsState',
  default: [],
});
