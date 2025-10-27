import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import logo2025 from "../assets/logos/logo_2025.svg?raw";
import logo2024 from "../assets/logos/logo_2024.svg?raw";
import logo2023 from "../assets/logos/logo_2023.svg?raw";
import logo2022 from "../assets/logos/logo_2022.svg?raw";
import logo2021 from "../assets/logos/logo_2021.svg?raw";
import logo2020 from "../assets/logos/logo_2020.svg?raw";
import logo2019 from "../assets/logos/logo_2019.svg?raw";
import logo2018 from "../assets/logos/logo_2018.svg?raw";
import logoInfo from "../assets/logos/logo_info.svg?raw";

const CONSTANT_IMAGES = [
  logo2025,
  logo2024,
  logo2023,
  logo2022,
  logo2021,
  logo2020,
  logo2019,
  logo2018
];

const HOVER_IMAGES = [
  logoInfo,
  logo2025,
  logo2024,
  logo2023,
  logo2022,
  logo2021,
  logo2020,
  logo2019,
  logo2018
];

export const AnimatedLogoConstant = () => {
  const changeImageFnRef = useRef<() => void>(() => {});
  const [rotation, setRotation] = useState(0);
  const [topOpacity, setTopOpacity] = useState(1);
  const [topCurrentImage, setTopCurrentImage] = useState(0);
  const [bottomCurrentImage, setBottomCurrentImage] = useState(-1);
  const intervalRef = useRef<number | null>(null);

  // this updates every render so the ref always has a fresh function
  changeImageFnRef.current = () => {
    // switch to bottom
    if (topOpacity) {
      setRotation((prev) => prev + 360);
      setBottomCurrentImage((prev) => (prev + 2) % CONSTANT_IMAGES.length); // bottom switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades out
    }
    // switch to top
    else {
      setRotation((prev) => prev + 360);
      setTopCurrentImage((prev) => (prev + 2) % CONSTANT_IMAGES.length); // top switches by 2
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
      <motion.div
        animate={{ rotate: rotation, opacity: topOpacity }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          zIndex: 2,
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        dangerouslySetInnerHTML={{ __html: CONSTANT_IMAGES[topCurrentImage] }}
      />
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          zIndex: 1,
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        dangerouslySetInnerHTML={{
          __html: CONSTANT_IMAGES[bottomCurrentImage % CONSTANT_IMAGES.length]
        }}
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

  // this updates every render so the ref always has a fresh function
  changeImageFnRef.current = () => {
    // switch to bottom
    if (topOpacity) {
      setRotation((prev) => prev + 360);
      setBottomCurrentImage((prev) => (prev + 2) % HOVER_IMAGES.length); // bottom switches by 2
      setTopOpacity((prev) => (prev + 1) % 2); // top fades out
    }
    // switch to top
    else {
      setRotation((prev) => prev + 360);
      setTopCurrentImage((prev) => (prev + 2) % HOVER_IMAGES.length); // top switches by 2
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
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{ rotate: rotation, opacity: topOpacity }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          zIndex: 2,
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        dangerouslySetInnerHTML={{ __html: HOVER_IMAGES[topCurrentImage] }}
      />
      <motion.div
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          zIndex: 1,
          position: "absolute",
          width: "100%",
          height: "100%"
        }}
        dangerouslySetInnerHTML={{
          __html: HOVER_IMAGES[bottomCurrentImage % HOVER_IMAGES.length]
        }}
      />
    </>
  );
};
