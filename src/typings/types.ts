export interface IContent {
  id: number;
  url: string;
  linkImg: string;
  title: string;
  text: string;
}

interface IProps {
  term: string;
  onChangeTerm: (e: any) => void;
}
