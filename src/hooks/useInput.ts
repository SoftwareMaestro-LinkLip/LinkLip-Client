import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: any) => void;
type ReturnTypes<T = any> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const handler = useCallback((value: any) => {
    setValue(value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
