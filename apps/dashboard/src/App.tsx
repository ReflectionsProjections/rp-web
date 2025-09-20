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
import Events from "./components/Events";
import Leaderboard from "./components/Leaderboard";
import { RegisterNow } from "./components/RegisterNow";
import { Sponsors } from "./components/Sponsors";
import Title from "./components/Title";
import useTimeSyncedReload from "./hooks/TimeSynchedReload";
import WebhookPopup from "./components/WebhookPopup";

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

// Information about various Siebel screens for reference:
// Main Siebel Giant Screen: 1920x1080 (dpr 1) - Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) KorbytPlayer/3.21.2 Chrome/114.0.5735.289 Electron/25.8.4 Safari/537.36 - Win32
// Siebel TVs: 1920x1080 (dpr 1) - BrightSign/9.0.211 (XD235) Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) QtWebEngine/5.15.2 Chrome/87.0.4280.144 Safari/537.36 - Linux aarch64
// Debug Info: {window.innerWidth}x{window.innerHeight} (dpr {window.devicePixelRatio}) - {navigator.userAgent} - {navigator.platform}

function App() {
  useTimeSyncedReload();

  return (
    <ChakraProvider theme={theme}>
      <Box backgroundImage="url('./background.svg')" backgroundSize="cover">
        <Flex
          position={"relative"} // Required for z-index
          flexDirection={"column"}
          alignItems={"center"}
          width={"100%"}
          minH="100vh"
          boxSizing="border-box"
          padding={"2vh"}
          paddingTop="0.5vh"
          zIndex={2}
        >
          <WebhookPopup />
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
            <Flex width={"50%"} flexDir={"column"}>
              <Events />
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
        >
          <Leaderboard trackPercent={0.5} />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
