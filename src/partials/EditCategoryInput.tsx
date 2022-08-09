import React, {
  useRef,
  useState,
  Dispatch,
  useCallback,
  useEffect,
} from 'react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import useInput from '../hooks/useInput';

interface IProps {
  editCategoryId: number;
  editCategoryName: string;
  setEditCategoryId: Dispatch<React.SetStateAction<number>>;
  categoryId: number;
}

const EditCategoryInput = (props: IProps) => {
  const ref = useRef(null);
  const [name, onChangeName] = useInput(props.editCategoryName);

  useOnClickOutside(
    ref,
    (event) => {
      props.setEditCategoryId(0);
    },
    true,
  );

  useEffect(() => {
    const htmlInput = document.querySelector('input');
    if (htmlInput) {
      htmlInput.focus();
    }
  }, []);

  return (
    <form ref={ref}>
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
          type="button"
          id="button-addon3"
        >
          수정
        </button>
      </div>
    </form>
  );
};

export default EditCategoryInput;
