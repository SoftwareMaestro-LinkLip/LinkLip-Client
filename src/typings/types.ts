export interface ILinkContent {
  category: ICategory;
  id: number;
  url: string;
  linkImg: string;
  title: string;
  text: string;
  categoryId: number | null;
}

export interface ICategory {
  id: number | null;
  name: string | null;
}

export interface IEditContentInfo {
  categoryId: number | null;
  title: string;
}
