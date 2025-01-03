import { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Trigger the callback when clicking outside
      }
    };

    // Attach the event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref; // Return the ref to attach to the element you want to watch
};

export default useOutsideClick;
