import axios, { AxiosResponse } from 'axios';
import { ICategory } from '../typings/content';
import { authHeader } from './auth';

/**
 * 사용자 카테고리 불러오기 함수
 * @param {string} term
 * @param {number} page
 * @param {number} categoryId
 * @param {number} contentsSize
 * @returns {Promise<any>}
 */
export const getCategories = async (all: boolean = false): Promise<any> => {
  const response: AxiosResponse<any> = await axios.get(
    `${import.meta.env.VITE_API_SERVER}/category/v1`,
    {
      headers: authHeader(),
    },
  );

  if (!response.data.success) {
    alert('불러오지 못했습니다');
  }

  let res = response.data.data.category;
  if (!all) {
    res = res.filter((item: any) => !item.name.startsWith('__linklip:'));
  }
  return [...res];
};

/**
 * 카테고리 저장 함수
 * @param {string} name
 * @returns {Promise<any>}
 */
export const addCategory = async (name: string) => {
  const body = {
    name,
  };
  return await axios
    .post(`${import.meta.env.VITE_API_SERVER}/category/v1`, body, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      alert('카테고리 추가 실패');
      return false;
    });
};

/**
 * 카테고리명 수정 함수
 * @param {number} id
 * @param {string} name
 * @returns {Promise<any>}
 */
export const editCategory = async (id: number, name: string) => {
  const body = {
    name,
  };
  return await axios
    .patch(`${import.meta.env.VITE_API_SERVER}/category/v1/${id}`, body, {
      headers: authHeader(),
    })
    .then((response) => {
      if (response.data.success) {
        return response.data.success;
      }
    })
    .catch((err) => {
      alert('카테고리 수정 실패');
      return false;
    });
};

/**
 * 카테고리 삭제 함수
 * @param {number} categoryId
 * @returns {Promise<any>}
 */
export const deleteCategory = async (categoryId: number) => {
  return await axios
    .delete(`${import.meta.env.VITE_API_SERVER}/category/v1/${categoryId}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      alert('카테고리 삭제 실패');
      return false;
    });
};
