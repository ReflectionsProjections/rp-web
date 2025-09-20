import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

export const customTheme = extendTheme({
  config,
  fonts: {
    heading: "'Anonymous Pro', monospace",
    body: "'Anonymous Pro', monospace",
    menu: "'Raleway', monospace"
  },
  textStyles: {
    menu: {
      fontFamily: "menu",
      fontSize: "18px",
      textColor: "black",
      fontWeight: "700",
      textUnderlineOffset: "5px"
    },
    textBlock: {
      fontFamily: "menu",
      fontSize: "65px",
      textColor: "black",
      fontWeight: "700",
      textUnderlineOffset: "5px"
    }
  }
});
