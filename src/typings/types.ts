export interface ILinkContent {
  id: number;
  url: string;
  linkImg: string;
  title: string;
  text: string;
  categoryId: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface IEditContentInfo {
  categoryId: number;
  title: string;
}
