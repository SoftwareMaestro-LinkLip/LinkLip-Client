import { atom, RecoilState } from 'recoil';
import { IContents } from '../typings/content';

export const contentsState: RecoilState<IContents> = atom<IContents>({
  key: 'contentsState',
  default: [],
});
