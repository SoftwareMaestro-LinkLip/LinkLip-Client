import { atom, selector, RecoilState } from 'recoil';
import axios, { AxiosInstance } from 'axios';

export const serverAPIState: RecoilState<AxiosInstance> = atom<AxiosInstance>({
  key: 'serverAPIState',
  default: axios.create({}),
});
