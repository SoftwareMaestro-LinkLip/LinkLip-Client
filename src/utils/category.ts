import axios, { AxiosResponse } from 'axios';
import { ICategory } from '../typings/types';

export const getCategories = async (
  term: string = '',
  page: number = 0,
  categoryId: number = 0,
  contentsSize: number = 12,
): Promise<any> => {
  const total: ICategory = { id: 0, name: '전체' };

  const response: AxiosResponse<any> = await axios.get(
    `${import.meta.env.VITE_API_SERVER}/category/v1`,
  );

  if (!response.data.success) {
    alert('카테고리를 불러오지 못했습니다');
  }

  return [...response.data.data.category];
};

export const addCategory = async (name: string) => {
  const body = {
    name,
  };
  return await axios
    .post(`${import.meta.env.VITE_API_SERVER}/category/v1`, body, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      return response.data.success;
    })
    .catch((err) => {
      alert('카테고리 추가 실패');
      return false;
    });
};

export const editCategory = async (id: number, name: string) => {
  const body = {
    name,
  };
  return await axios
    .patch(`${import.meta.env.VITE_API_SERVER}/category/v1/${id}`, body, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
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
