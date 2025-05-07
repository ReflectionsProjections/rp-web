import { useColorModeValue } from "@chakra-ui/react";

export const useMirrorStyles = (motion?: boolean) => {
  return {
    borderRadius: "2xl",
    p: 4,
    bg: useColorModeValue("blackAlpha.100", "whiteAlpha.100"),
    border: "1px solid",
    borderColor: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
    boxShadow: "md",
    backdropFilter: "blur(12px)",
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
        ? "perspective(2000px) rotateY(-1deg) rotateX(-0.5deg) scale(1.005)"
        : "",
      _after: {
        transition: "left 0.75s ease",
        left: "135%"
      }
    }
  };
};
