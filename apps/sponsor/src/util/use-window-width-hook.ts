import { useState, useEffect } from "react";

function useWindowWidth(debounceDelay = 10) {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, debounceDelay);
    };

    window.addEventListener("resize", handleResize);

    // Call initially
    handleResize();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [debounceDelay]);

  return width;
}

export default useWindowWidth;
