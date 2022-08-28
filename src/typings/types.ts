export interface ILinkContent {
  id: number;
  url: string;
  linkImg: string;
  title: string;
  text: string;
  // categoryId: number;
  categoryName: string;
}

export interface ICategory {
  id: number | null;
  name: string;
}

export interface IEditContentInfo {
  categoryId: number | null;
  title: string;
}
