import { atom, selector, RecoilState } from 'recoil';
import { ICategory } from '../typings/content';

export const editCategoryIdState = atom({
  key: 'editCategoryIdState',
  default: 0,
});

export const userCategoriesState: RecoilState<ICategory[]> = atom<ICategory[]>({
  key: 'userCategoriesState',
  default: [],
});

export const categoriesState: RecoilState<ICategory[]> = selector<ICategory[]>({
  key: 'categoriesState',
  get: ({ get }) => {
    const totalCategory = { id: null, name: '전체' };
    const userCategories = get(userCategoriesState);
    return [totalCategory, ...userCategories];
  },
  set: ({ set }, categories) => {
    const res: ICategory[] = [...(categories as ICategory[])];
    set(userCategoriesState, res);
  },
});
