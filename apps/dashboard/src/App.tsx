import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  ThemeConfig
} from "@chakra-ui/react";
import Title from "./components/Title";
import Events from "./components/Events";
import Leaderboard from "./components/Leaderboard";
import { useEffect } from "react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};
const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        "background-color": "darkred",
        color: "white"
      }
    }
  }
});

function App() {
  useEffect(() => {
    // setTimeout(() => location.reload(), 5 * 60 * 1000);
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        height={"100vh"}
        padding={"1rem"}
      >
        <Title />
        <Flex width={"100%"} minHeight={"0"} flexGrow={"1"}>
          <Box width={"50%"} height={"100%"} alignItems={"left"}>
            <Leaderboard />
          </Box>
          <Box width={"50%"} alignItems={"right"}>
            <Events />
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
