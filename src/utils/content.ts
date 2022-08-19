import axios, { AxiosResponse } from 'axios';
import { ILinkContent } from '../typings/types';
import { parse } from './link';

export const getContents = async (
  contentsSize: number = 12,
  categoryId: number = 0,
  term: string = '',
  pageIdx: number = 0,
): Promise<any> => {
  const target = `${
    import.meta.env.VITE_API_SERVER
  }/content/v1/link?page=${pageIdx}&size=${contentsSize}${
    !!term ? `&term=${term}` : ''
  }${!!categoryId ? `&categoryId=${categoryId}` : ''}`;

  console.log('url', target);

  const response: AxiosResponse<any> = await axios.get(target);

  return [...response.data.data.pageDto.content];
};

export const addLinkContent = async (content: ILinkContent): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_SERVER}/content/v1/link`,
    content,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return response.data;
};
