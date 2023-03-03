import { useEffect, useRef } from "react";

interface objectKeys {
  [key: string]: boolean;
}

const keys: objectKeys = {
  j: true,
  l: true,
  i: true,
  k: true,
  f: true,
  e: true,
  a: true,
  s: true,
  c: true,
  m: true,
  x: true,  
};

function useKeyboard() {
  const keymap = useRef<objectKeys>({});

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (keys[e.key as keyof typeof keys]) {
        keymap.current[e.key] = true;
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      keymap.current[e.key] = false;
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);       

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);        
    };
  },[]);

  return keymap.current;
}

export default useKeyboard;
