import {
  Box,
  ChakraProvider,
  extendTheme,
  Flex,
  Text,
  ThemeConfig
} from "@chakra-ui/react";
import "@fontsource/nunito";
import "@fontsource/roboto-slab";
import { useTime } from "@rp/shared";
import Events from "./components/Events";
import Leaderboard from "./components/Leaderboard";
import { RegisterNow } from "./components/RegisterNow";
import { Sponsors } from "./components/Sponsors";
import Title from "./components/Title";
import useTimeSyncedReload from "./hooks/TimeSynchedReload";

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
  useTimeSyncedReload();

  const time = useTime(1000);
  const date = new Date(time);

  return (
    <ChakraProvider theme={theme}>
      <Box backgroundImage="url('./background.svg')" backgroundSize="cover">
        <Flex
          position={"relative"} // Required for z-index
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
          minH="100vh"
          padding={"2vh"}
          paddingTop="0.5vh"
          zIndex={2}
        >
          <Title />
          <Text
            position={"absolute"}
            top={"0.5vh"}
            left={"25%"}
            fontSize={"2.5vh"}
            fontWeight="bold"
            color="white"
            fontFamily="ProRacingSlant"
            textAlign="center"
            transform={"translateX(-50%)"}
            paddingX={"1.25vh"}
            borderRadius="1rem"
            bgColor={"rgba(0,0,0,0.2)"}
          >
            Leaderboard
          </Text>
          <Flex width={"100%"} mt={"0"} flexGrow={1}>
            <Flex width={"50%"} marginRight={"1vh"} alignItems={"flex-end"}>
              <RegisterNow />
            </Flex>
            <Flex width={"50%"} flexDir={"column"} gap={"1.5vh"}>
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
