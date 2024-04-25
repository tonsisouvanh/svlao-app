import { useEffect, useRef } from "react";

const useScrollToTop = () => {
  const scrollToTop = useRef(null);
  useEffect(() => {
    if(scrollToTop.current){
      scrollToTop.current.scrollIntoView({behavior: "smooth"});
    }
  }, []); // Empty dependency array
  return scrollToTop;
};

export default useScrollToTop;
