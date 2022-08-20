import { selector, RecoilState } from 'recoil';
import { categoriesAtom } from './atoms';
import { ILinkContent, ICategory } from '../typings/types';

export const categoriesSelector: RecoilState<ICategory[]> = selector<
  ICategory[]
>({
  key: 'categoriesSelector',
  get: ({ get }) => {
    const categories = get(categoriesAtom);
    return [...categories];
  },
  set: ({ set }, categories) => {
    const totalCategory = { id: 0, name: '전체' };
    let res: ICategory[] = [];
    res = [totalCategory, ...(categories as ICategory[])];
    set(categoriesAtom, res);
  },
});
