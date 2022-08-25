import axios, { AxiosResponse } from 'axios';
import { ILinkContent, IEditContentInfo } from '../typings/types';
import { parse } from './link';

/**
 * 저장된 컨텐츠 불러오는 함수
 * @param {number} contentsSize
 * @param {number} categoryId
 * @param {string} term
 * @param {number} pageIdx
 * @returns {Promise<any>}
 */
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

/**
 * 링크 컨텐츠 저장 함수
 * @param {ILinkContent} content
 * @returns {Promise<any>}
 */
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

/**
 * 컨텐츠의 내용 수정 함수
 * @param {number} contentId
 * @param {IEditContentInfo} body
 * @returns {Promise<any>}
 */
export const editLinkContent = async (
  contentId: number,
  body: IEditContentInfo,
): Promise<any> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_SERVER}/content/v1/link/${contentId}`,
    body,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return response.data;
};

export const deleteLinkContent = async (contentId: number): Promise<any> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_SERVER}/content/v1/link/${contentId}`,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );

  return response.data;
};
