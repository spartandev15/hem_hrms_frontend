import { useEffect } from "react";

const useScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Scroll to top when the hook is called or component is mounted
    scrollToTop();
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return scrollToTop;
};

export default useScrollToTop;
