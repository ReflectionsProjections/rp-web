import { useEffect } from "react";
import "./App.css";
import "@fontsource/roboto-slab";
import "@fontsource/nunito";
import {
  ChakraProvider,
  HStack,
  VStack,
  Text,
  useMediaQuery,
  Button,
  Box,
  Link
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

              <Box
                sx={{
                  p: "2px",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, #b9b8b8 0%, #888888 100%)",
                  display: "inline-block"
                }}
                mt={isMobile ? "12px" : "24px"}
                mb={isMobile ? "12px" : "24px"}
              >
                <Button
                  as={Link}
                  href="https://2024.reflectionsprojections.org"
                  isExternal
                  variant="outline"
                  borderColor="#b9b8b8"
                  color="#b9b8b8"
                  bg="black"
                  size={isSmall ? "sm" : isMobile ? "md" : "lg"}
                  fontSize={isSmall ? "14px" : isMobile ? "18px" : "24px"}
                  fontWeight="700"
                  px={isSmall ? "18px" : isMobile ? "24px" : "32px"}
                  py={isSmall ? "8px" : isMobile ? "12px" : "16px"}
                  borderRadius="full"
                  boxShadow="0 2px 12px rgba(0,0,0,0.18)"
                  _hover={{
                    bg: "linear-gradient(90deg, #e0e0e0 0%, #b9b8b8 100%)",
                    color: "black",
                    borderColor: "transparent",
                    textDecoration: "none"
                  }}
                  transition="background 0.3s, color 0.3s"
                >
                  Visit 2024 Site
                </Button>
              </Box>
            </VStack>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
