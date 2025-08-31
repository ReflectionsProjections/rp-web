import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export const AnimatedLogoConstant = () => {
  const changeImageFnRef = useRef<() => void>(() => {});
  const [rotation, setRotation] = useState(0);
  const [topOpacity, setTopOpacity] = useState(1);
  const [topCurrentImage, setTopCurrentImage] = useState(0);
  const [bottomCurrentImage, setBottomCurrentImage] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  const images = [
    "logo_2025.svg",
    "logo_2024.svg",
    "logo_2023.svg",
    "logo_2022.svg",
    "logo_2021.svg",
    "logo_2020.svg",
    "logo_2019.svg",
    "logo_2018.svg"
  ];

  // this updates every render so the ref always has a fresh function
  changeImageFnRef.current = () => {
    // switch to bottom
    if (topOpacity) {
      setRotation((prev) => prev + 360);
      setBottomCurrentImage((prev) => (prev + 2) % images.length); // bottom switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades out
    }
    // switch to top
    else {
      setRotation((prev) => prev + 360);
      setTopCurrentImage((prev) => (prev + 2) % images.length); // top switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades in
    }
  };

  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const startRotation = useCallback(() => {
    // if the browser 'focus' event fires twice, just
    // stop the extra trigger here
    stopRotation();
    intervalRef.current = window.setInterval(() => {
      changeImageFnRef.current();
    }, 6000);
  }, []);

  useEffect(() => {
    console.log("setting window listeners...");
    startRotation();
    window.addEventListener("blur", stopRotation);
    window.addEventListener("focus", startRotation);

    return () => {
      stopRotation();
      window.removeEventListener("blur", stopRotation);
      window.removeEventListener("focus", startRotation);
    };
  }, [startRotation]); // happy linter... (and just in case)

  return (
    <>
      <motion.img
        animate={{ rotate: rotation, opacity: topOpacity }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        width="100%"
        height="100%"
        style={{
          zIndex: 2,
          position: "absolute"
        }}
        src={images[topCurrentImage]}
      />
      <motion.img
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        width="100%"
        height="100%"
        style={{
          zIndex: 1,
          position: "absolute"
        }}
        src={images[bottomCurrentImage % images.length]}
      />
    </>
  );
};

export const AnimatedLogoHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  const changeImageFnRef = useRef<() => void>(() => {});
  const [rotation, setRotation] = useState(0);
  const [topOpacity, setTopOpacity] = useState(1);
  const [topCurrentImage, setTopCurrentImage] = useState(0);
  const [bottomCurrentImage, setBottomCurrentImage] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  const images = [
    "logo_info.svg",
    "logo_2025.svg",
    "logo_2024.svg",
    "logo_2023.svg",
    "logo_2022.svg",
    "logo_2021.svg",
    "logo_2020.svg",
    "logo_2019.svg",
    "logo_2018.svg"
  ];

  // this updates every render so the ref always has a fresh function
  changeImageFnRef.current = () => {
    // switch to bottom
    if (topOpacity) {
      setRotation((prev) => prev + 360);
      setBottomCurrentImage((prev) => (prev + 2) % images.length); // bottom switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades out
    }
    // switch to top
    else {
      setRotation((prev) => prev + 360);
      setTopCurrentImage((prev) => (prev + 2) % images.length); // top switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades in
    }
  };

  // runs on hover on/off - either enabling or disabling the rotation interval
  useEffect(() => {
    if (isHovered) {
      changeImageFnRef.current();
      intervalRef.current = window.setInterval(() => {
        changeImageFnRef.current();
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    // every time isHovered becomes false, useEffect runs here,
    // hitting the else statement and killing the active interval.

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <>
      <motion.img
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ rotate: rotation, opacity: topOpacity }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        width="100%"
        height="100%"
        style={{
          zIndex: 2,
          position: "absolute"
        }}
        src={images[topCurrentImage]}
      />
      <motion.img
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        width="100%"
        height="100%"
        style={{
          zIndex: 1,
          position: "absolute"
        }}
        src={images[bottomCurrentImage % images.length]}
      />
    </>
  );
};
