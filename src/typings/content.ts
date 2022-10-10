export interface ICategory {
  id: number | null;
  name: string | null;
}

export interface IContents
  extends Array<ILinkContent | INoteContent | IImageContent> {}

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
  category: ICategory | null;
  text: string;
  id: number;
  type: string;
}

export interface IImageContent {
  category: ICategory | null;
  id: number;
  linkImg: string;
  type: string;
}

export interface IEditLinkContent {
  categoryId: number | null;
  title: string;
}

export interface IEditNoteContent {
  categoryId: number | null;
  text: string;
}
