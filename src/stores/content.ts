import { atom, RecoilState } from 'recoil';
import { ILinkContent, INoteContent, IContents } from '../typings/content';

export const contentsState: RecoilState<IContents> = atom<IContents>({
  key: 'contentsState',
  default: [],
});

// 이미지 컨텐츠 카드 테스트용 코드
// 이미지 컨텐츠 업로드 기능 완료 후 삭제 할 예정

// export const contentsState: RecoilState<IContents> = atom<IContents>({
//   key: 'contentsState',
//   default: [
//     {
//       category: null,
//       id: 12345,
//       linkImg:
//         'https://images.unsplash.com/photo-1664575657978-372d91ca352a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
//       type: 'image',
//     },
//   ],
// });
