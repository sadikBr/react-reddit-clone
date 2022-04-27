import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollY(window.scrollY);
    });
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (scrollY > 1500) {
    return (
      <div onClick={scrollToTop} className="to-top">
        ↑
      </div>
    );
  } else {
    return null;
  }
};

export default ScrollToTop;
