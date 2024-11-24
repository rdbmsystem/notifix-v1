import { useEffect, useRef } from "react";

export const useOutsideClick = (handler, listCapturing = true) => {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listCapturing);
    },
    [handler, listCapturing]
  );

  return ref;
};
