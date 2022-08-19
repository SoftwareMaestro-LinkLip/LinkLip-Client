import React, { useRef, Dispatch, useCallback, useEffect } from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useKeyPressESC from '../hooks/useKeyPressESC';
import useInput from '../hooks/useInput';
import { getCategories, editCategory } from '../utils/category';
import { ICategory } from '../typings/types';

interface IProps {
  categoryId: number;
  categoryName: string;
  setEditCategoryId: Dispatch<React.SetStateAction<number>>;
  setCategories: Dispatch<React.SetStateAction<ICategory[]>>;
}

const EditCategoryInput = (props: IProps) => {
  const ref = useRef(null);
  const [name, onChangeName] = useInput(props.categoryName);

  useOnClickOutside(ref, () => {
    props.setEditCategoryId(0);
  });

  useKeyPressESC(() => {
    props.setEditCategoryId(0);
  });

  useEffect(() => {
    const htmlInput = document.querySelector('input');
    if (htmlInput) {
      htmlInput.focus();
    }
  }, []);

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      editCategory(props.categoryId, name).then(() => {
        getCategories().then((res) => {
          props.setCategories([...res]);
        });
      });
      props.setEditCategoryId(0);
    },
    [name],
  );

  return (
    <form ref={ref} onSubmit={onSubmitHandler}>
      <div className="flex justify-between w-full">
        <input
          className="w-full outline-none border-b-2 border-slate-400 bg-transparent px-3 py-1.5 text-xl"
          aria-label="카테고리명 수정"
          value={name}
          tabIndex={1}
          onChange={onChangeName}
        />
        <button
          className="w-10 text-slate-400 font-medium text-xs rounded"
          type="submit"
          id="button-addon3"
          aria-label="수정 완료"
        >
          수정
        </button>
      </div>
    </form>
  );
};

export default EditCategoryInput;
