import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  ThemeConfig
} from "@chakra-ui/react";
import "@fontsource/nunito";
import "@fontsource/roboto-slab";
import { useEffect, useState } from "react";
import Events from "./components/Events";
import Leaderboard from "./components/Leaderboard";
import { RegisterNow } from "./components/RegisterNow";
import { Sponsors } from "./components/Sponsors";
import Title from "./components/Title";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false
};
const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        "background-color": "black",
        color: "white"
      }
    }
  }
});

function App() {
  useEffect(() => {
    // setTimeout(() => location.reload(), 5 * 60 * 1000);
  }, []);

  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    // Update every 1000ms (1 second)
    const interval = setInterval(() => {
      setDate((prev) => new Date(prev ? prev.getTime() + 1000 : Date.now()));
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box backgroundImage="url('./background.svg')" backgroundSize="cover">
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
          minH="100vh"
          padding={"2rem"}
          paddingTop="0.5rem"
          zIndex={2}
        >
          <Title />
          <Flex width={"100%"} mt={4} zIndex={2} flexGrow={1}>
            <Flex
              width={"50%"}
              flexGrow={"1"}
              marginRight={"5rem"}
              alignItems={"end"}
            >
              <RegisterNow />
            </Flex>
            <Flex
              width={"50%"}
              marginLeft={"5rem"}
              alignItems={"right"}
              flexDir={"column"}
              gap={4}
            >
              <Events date={date} />
              <Sponsors />
            </Flex>
          </Flex>
        </Flex>
        {/* Leaderboard needs to be positioned absolutely to ignore padding */}
        <Box
          zIndex={1}
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflowY={"hidden"}
        >
          <Leaderboard trackPercent={0.5} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
