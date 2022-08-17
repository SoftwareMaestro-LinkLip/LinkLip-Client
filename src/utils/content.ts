import axios, { AxiosResponse } from 'axios';
import { IContent } from '../typings/types';

export const getContents = async (
  term: string = '',
  page: number = 0,
  categoryId: number = 0,
  contentsSize: number = 12,
): Promise<any> => {
  const target = `${
    import.meta.env.VITE_API_SERVER
  }/content/v1/link?page=${page}&size=${contentsSize}${
    !!term ? `&term=${term}` : ''
  }${!!categoryId ? `&categoryId=${categoryId}` : ''}`;

  console.log('url', target);

  const response: AxiosResponse<any> = await axios.get(target);

  // .then((response) => {
  //   if (response.data.success) {
  //     res = [...response.data.data.pageDto.content];
  //   }
  // })
  // .catch((err) => console.log(err));

  return [...response.data.data.pageDto.content];
};

export default {
  getContents,
};
