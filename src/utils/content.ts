import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import {
  IEditLinkContent,
  IEditNoteContent,
  IEditImageContent,
} from '../typings/content';
import { authHeader } from './auth';

/**
 * 저장된 컨텐츠 불러오는 함수
 * @param {number} contentsSize
 * @param {number} categoryId
 * @param {string} term
 * @param {number} pageIdx
 * @returns {Promise<any>}
 */
export const getContents = async (
  contentsSize: number = 24,
  categoryId: number | null = null,
  term: string = '',
  pageIdx: number = 0,
): Promise<any> => {
  const target = `${
    import.meta.env.VITE_API_SERVER
  }/content/v1/?page=${pageIdx}&size=${contentsSize}${
    !!term ? `&term=${term}` : ''
  }${!!categoryId ? `&categoryId=${categoryId}` : ''}`;

  const response: AxiosResponse<any> = await axios.get(target, {
    headers: authHeader(),
  });

  console.log('res.data', response.data);

  return [...response.data.data.content];
};

/**
 * 링크 컨텐츠 저장 함수
 * @param {{url: string, linkImg: string, title: string, text: string, categoryId: number}} content
 * @returns {Promise<any>}
 */
export const addLinkContent = async (content: {
  url: string;
  linkImg: string;
  title: string;
  text: string;
  categoryId: number;
}): Promise<any> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_SERVER}/content/v1/link`,
    content,
    {
      headers: authHeader(),
    },
  );

  return response.data;
};

/**
 * 링크 컨텐츠 정보 불러오기 함수
 * @param {number} contentId
 * @returns {Promise<any>}
 */
export const getLinkContent = async (contentId: number): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_SERVER}/content/v1/${contentId}`,
    {
      headers: authHeader(),
    },
  );

  return response.data.data.content;
};

/**
 * 링크 컨텐츠의 내용 수정 함수
 * @param {number} contentId
 * @param {IEditContentInfo} body
 * @returns {Promise<any>}
 */
export const editLinkContent = async (
  contentId: number,
  body: IEditLinkContent,
): Promise<any> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_SERVER}/content/v1/link/${contentId}`,
    body,
    {
      headers: authHeader(),
    },
  );

  return response.data;
};

/**
 * 노트 컨텐츠 저장 함수
 * @param {{text: string, categoryId: number}} content
 * @returns {Promise<any>}
 */
export const addNoteContent = async (content: {
  text: string;
  categoryId: number | null;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER}/content/v1/note`,
      content,
      {
        headers: authHeader(),
      },
    );

    return true;
  } catch {
    return false;
  }
};

/**
 * 노트 컨텐츠 정보 불러오기 함수
 * @param {number} contentId
 * @returns {Promise<any>}
 */
export const getNoteContent = async (contentId: number): Promise<any> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_SERVER}/content/v1/note/${contentId}`,
    {
      headers: authHeader(),
    },
  );

  return response.data;
};

/**
 * 노트 컨텐츠의 내용 수정 함수
 * @param {number} contentId
 * @param {IEditNoteContent} body
 * @returns {Promise<any>}
 */
export const editNoteContent = async (
  contentId: number,
  body: IEditNoteContent,
): Promise<any> => {
  const response = await axios.patch(
    `${import.meta.env.VITE_API_SERVER}/content/v1/note/${contentId}`,
    body,
    {
      headers: authHeader(),
    },
  );
  return response.data;
};

/**
 * 이미지 컨텐츠 저장 함수
 * @param {FormData} content
 * @returns {Promise<any>}
 */
export const addImageContent = async (request: FormData): Promise<any> => {
  const header: AxiosRequestHeaders = authHeader();
  header['Content-Type'] = 'multipart/form-data';

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_SERVER}/content/v1/image`,
      request,
      {
        headers: authHeader(),
      },
    );

    return true;
  } catch {
    return false;
  }
};

/**
 * 이미지 컨텐츠의 내용 수정 함수
 * @param {number} contentId
 * @param {IEditImageContent} body
 * @returns {Promise<any>}
 */
export const editImageContent = async (
  contentId: number,
  body: IEditImageContent,
): Promise<any> => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_SERVER}/content/v1/image/${contentId}`,
      body,
      {
        headers: authHeader(),
      },
    );

    return response.data;
  } catch {
    alert('해당 기능이 아직 구현되지 않았습니다.');
  }
};

/**
 * 컨텐츠 삭제 함수
 * @param {number} contentId
 * @returns {Promise<any>}
 */
export const deleteContent = async (contentId: number): Promise<any> => {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_SERVER}/content/v1/${contentId}`,
    {
      headers: authHeader(),
    },
  );

  return response.data;
};
