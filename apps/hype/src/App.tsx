import { useEffect } from "react";
import "./App.css";
import "@fontsource/roboto-slab";
import "@fontsource/nunito";
import {
  ChakraProvider,
  HStack,
  VStack,
  Text,
  useMediaQuery
} from "@chakra-ui/react";
import yourGif from "./assets/RPREC.gif"; // adjust path as needed

function App() {
  const [isSmall] = useMediaQuery("(max-width: 480px)");
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <ChakraProvider>
      <div className="app-wrapper">
        {/* Background grid layer with spotlight mask */}
        <div className="background-grid" />
        <div className="app-container">
          <div className="gif-container">
            <img src={yourGif} alt="Centered GIF" className="centered-gif" />
          </div>
          <div className="title-container">
            <HStack
              justifyContent="center"
              spacing="8px"
              textAlign="center"
              ml="16px"
            >
              <Text
                fontSize={isSmall ? "20" : isMobile ? "33" : "56"}
                fontFamily="Roboto Slab"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                reflections
              </Text>
              <Text
                fontSize={isSmall ? "52" : isMobile ? "73" : "120"}
                fontFamily="Roboto Slab"
                fontWeight="200"
                letterSpacing="0.08em"
                mt="-10px"
              >
                |
              </Text>
              <Text
                fontSize={isSmall ? "20" : isMobile ? "33" : "56"}
                fontFamily="Roboto Slab"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                projections
              </Text>
            </HStack>
            <VStack spacing="12px" mt={isMobile ? "16px" : "2px"}>
              <Text
                fontSize={isSmall ? "28" : isMobile ? "40" : "64"}
                fontWeight="600"
                fontFamily="Roboto Slab"
                letterSpacing="0.05em"
                className="glow-text fade-in"
              >
                2025
              </Text>

              <Text
                fontSize={isSmall ? "16" : isMobile ? "24" : "32"}
                fontWeight="300"
                fontFamily="Nunito"
                letterSpacing="0.1em"
                className="glow-text fade-in-delayed"
              >
                coming soon
              </Text>
            </VStack>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
