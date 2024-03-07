import { useEffect, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";

const ScrollToTopButton = () => {
  //   const [showTopBtn, setShowTopBtn] = useState(false);
  //   useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       if (window.scrollY > 400) {
  //         setShowTopBtn(true);
  //       } else {
  //         setShowTopBtn(false);
  //       }
  //     });
  //   }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button
        onClick={goToTop}
        className="btn btn-square btn-outline btn-sm absolute bottom-10 left-10 z-[9999]"
      >
        <AiFillCaretUp size={24} />
      </button>
    </>
  );
};

export default ScrollToTopButton;
