import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false
};

export const customTheme = extendTheme({
  config,
  fonts: {
    heading: "'Anonymous Pro', monospace",
    body: "'Anonymous Pro', monospace"
  }
});
