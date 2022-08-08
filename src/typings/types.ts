export interface IContent {
  id: number;
  url: string;
  linkImg: string;
  title: string;
  text: string;
}

export interface ICategory {
  id: number;
  name: string;
}

interface IProps {
  term: string;
  onChangeTerm: (e: any) => void;
}
