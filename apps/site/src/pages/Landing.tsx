import {
  Box,
  HStack,
  Text,
  Button,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import Player from "lottie-react";
import animationData from "@/assets/Landing/homeScreen1.json";
import titleLeft from "@/assets/Landing/titleLeft.svg";
import titleRight from "@/assets/Landing/titleRight.svg";
import "@fontsource/roboto-slab";
import "@fontsource/nunito";

export default function Landing() {
  const [isMobile] = useMediaQuery("(max-width: 850px)");
  const [isSmall] = useMediaQuery("(max-width: 500px)");

  // responsive separator height (roughly tuned to text size)
  const sepH = isSmall ? "42px" : isMobile ? "90px" : "150px";

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <Box position="absolute" inset={0}>
        <Player
          autoplay
          loop
          animationData={animationData}
          rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
        />
      </Box>

      <VStack
        position="absolute"
        left="50%"
        top={isMobile ? "55vh" : "45%"}
        transform="translate(-50%, -50%)"
      >
        <Box
          w={{ base: "95vw", md: "90vw" }}
          maxW="1400px"
          bg="white"
          p={{ base: 4, md: 8 }}
          boxShadow="lg"
          zIndex={2}
          position="relative"
        >
          <Box
            position="absolute"
            left={{ base: "0px", md: "0px" }}
            bottom={{ base: "0px", md: "0px" }}
            top={{ base: "0px", md: "0px" }}
            w="auto"
            h="auto"
            zIndex={1}
          >
            <img
              src={titleLeft as string}
              alt="Title decoration left"
              style={{ height: "100%", width: "auto" }}
            />
          </Box>

          <Box
            position="absolute"
            right={{ base: "0px", md: "0px" }}
            bottom={{ base: "0px", md: "0px" }}
            top={{ base: "0px", md: "0px" }}
            w="auto"
            h="auto"
            zIndex={1}
          >
            <img
              src={titleRight as string}
              alt="Title decoration right"
              style={{ height: "100%", width: "auto" }}
            />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            zIndex={2}
          >
            <HStack
              justifyContent="center"
              spacing="14px"
              textAlign="center"
              align="center"
            >
              <Text
                fontSize={isSmall ? "20" : isMobile ? "33" : "46"}
                fontFamily="Roboto Slab"
                fontWeight="400"
                letterSpacing="0.08em"
              >
                reflections
              </Text>

              <Box
                as="span"
                w={isSmall ? "2px" : isMobile ? "4px" : "6px"}
                h={sepH}
                bg="black"
                borderRadius="1px"
                display="inline-block"
              />

              <Text
                fontSize={isSmall ? "20" : isMobile ? "33" : "46"}
                fontFamily="Roboto Slab"
                fontWeight="400"
                letterSpacing="0.08em"
              >
                projections
              </Text>
            </HStack>
          </Box>
        </Box>

        <Button
          as="a"
          href="/register"
          zIndex={2}
          size={isSmall ? "md" : "lg"}
          px={isSmall ? 8 : 10}
          py={isSmall ? 8 : 10}
          mt={isMobile ? "35vh" : "13vh"}
          bg="#EAA001"
          color="black"
          rounded="lg"
          _hover={{ bg: "gray.800", color: "white" }}
          _active={{ bg: "#EAA001" }}
          boxShadow="md"
        >
          <Text
            fontSize={isSmall ? "30" : isMobile ? "33" : "36"}
            fontWeight="800"
            fontStyle="italic"
            letterSpacing="0.01em"
          >
            Register
          </Text>
        </Button>
      </VStack>
    </Box>
  );
}
