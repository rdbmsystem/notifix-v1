import { useEffect } from "react";

const useClickOutside = (ref, callback, triggerRef) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log(ref.current, "Hello");
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        (!triggerRef ||
          (triggerRef.current && !triggerRef.current.contains(e.target)))
      ) {
        callback();
      }
    };

    // Ensure that the effect runs only when refs are assigned
    if (ref.current || (triggerRef && triggerRef.current)) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, triggerRef]);
};

export default useClickOutside;
