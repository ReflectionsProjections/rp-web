import { useColorModeValue } from "@chakra-ui/react";

export const useMirrorStyles = (animated?: boolean, motion?: boolean) => {
  const animation = {
    position: "relative",
    overflow: "hidden",
    _after: {
      content: `""`,
      position: "absolute",
      top: 0,
      left: "-85%",
      width: "50%",
      height: "100%",
      bg: useColorModeValue("whiteAlpha.300", "whiteAlpha.200"),
      transform: "skewX(-20deg)",
      zIndex: 100000,
      pointerEvents: "none"
    },
    _hover: {
      transform: motion
        ? "perspective(750px) rotateY(-1deg) rotateX(-1deg) scale(1.01)"
        : "",
      _after: {
        transition: "left 0.75s ease",
        left: "135%"
      }
    }
  };

  return {
    borderRadius: "2xl",
    p: 4,
    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
    border: "1px solid",
    borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    boxShadow: "md",
    backdropFilter: "blur(12px)",
    scrollbarWidth: "thin", // for Firefox
    scrollbarColor: "#888 transparent", // for Firefox
    "&::-webkit-scrollbar": {
      width: "8px"
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent"
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "8px"
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    },
    ...(animated ? animation : {})
  };
};
