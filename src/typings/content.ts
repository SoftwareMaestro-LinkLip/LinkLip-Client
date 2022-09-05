export interface ICategory {
  id: number | null;
  name: string | null;
}

export interface IContents extends Array<ILinkContent | INoteContent> {}

export interface ILinkContent {
  category: ICategory | null;
  id: number;
  type: string;
  url: string;
  linkImg: string;
  title: string;
  text: string;
}

export interface INoteContent {
  text: string;
  id: number;
  type: string;
}

export interface IEditContentInfo {
  categoryId: number | null;
  title: string;
}
