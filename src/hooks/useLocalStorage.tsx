import { useEffect, useState, Dispatch, SetStateAction } from "react";

export const useLocalStorage = (
  key: string,
  defData: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [state, setState] = useState(() => {
    const localData = localStorage.getItem(key);
    return localData || defData;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
