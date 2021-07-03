import { useCallback, useState } from 'react';

export function useLocalStorage(initialState, name) {
  const [state, setState] = useState(loadInitialState);

  function loadInitialState() {
    const item = JSON.parse(localStorage.getItem(name));
    return item || initialState;
  }
  const mySetState = useCallback(
    (value) => {
      if (value === null) {
        localStorage.removeItem(name);
      } else {
        localStorage.setItem(name, JSON.stringify(value));
      }
      setState(value);
    },
    [name]
  );

  return [state, mySetState];
}
