import { atom, RecoilState } from 'recoil';
import { ILinkContent } from '../typings/types';

export const contentsState: RecoilState<ILinkContent[]> = atom<ILinkContent[]>({
  key: 'contentsState',
  default: [],
});
