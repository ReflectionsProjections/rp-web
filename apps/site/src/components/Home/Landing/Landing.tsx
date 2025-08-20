import animationData from "@/assets/Landing/homeScreen1.json";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import "@fontsource/nunito";
import "@fontsource/roboto-slab";
import { motion, useAnimation, useInView } from "framer-motion";
import Player from "lottie-react";
import { useEffect, useRef } from "react";

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);

export const Landing = () => {
  const [isMobile] = useMediaQuery("(max-width: 850px)");
  const [isSmall] = useMediaQuery("(max-width: 500px)");
  const [isShort] = useMediaQuery("(max-height: 500px)");

  // compute separator height
  const sepH = isSmall ? 42 : isMobile ? 90 : 150;

  // refs & animation controls
  const barRef = useRef(null);
  const inView = useInView(barRef, { once: true });
  const barCtrl = useAnimation();
  const refCtrl = useAnimation();
  const projCtrl = useAnimation();

  const handleLoad = async () => {
    // 1) grow the bar
    await barCtrl.start({
      height: sepH,
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    // 2) slide in "reflections" from left
    await refCtrl.start({
      x: isSmall ? -10 : -20,
      transition: { duration: 0.8, ease: "easeOut" }
    });

    // 3) slide in "projections" from right
    await projCtrl.start({
      x: isSmall ? 10 : 20,
      transition: { duration: 0.8, ease: "easeOut" }
    });
  };

  useEffect(() => {
    if (!inView) return;
    void handleLoad();
  }, [inView, barCtrl, refCtrl, projCtrl, sepH]);

  return (
    <Box position="relative" h="100dvh" overflow="hidden">
      {/* background animation */}
      <LandingBackground />
      <VStack
        position="absolute"
        left="50%"
        top={isMobile ? "55vh" : "45%"}
        transform="translate(-50%, -50%)"
        spacing={6}
        zIndex={2}
      >
        {/* headline + animated bar */}
        <Box position="relative" textAlign="center" gap={0}>
          <HStack justify="center" alignItems="center" gap={0}>
            {/* portal container for reflections */}
            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}px`}
              w="500px"
              alignItems="center"
              justifyContent="flex-end"
            >
              <MotionText
                fontSize={{ base: "2xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontFamily="Roboto Slab"
                fontWeight="400"
                letterSpacing="0.08em"
                color="white"
                style={{ x: "100%" }}
                animate={refCtrl}
                textAlign="right"
              >
                reflections
              </MotionText>
            </Box>

            {/* the separator bar itself */}
            <MotionBox
              ref={barRef}
              as="span"
              display="inline-block"
              w={isSmall ? "2px" : isMobile ? "4px" : "6px"}
              bg="white"
              borderRadius="1px"
              height={0} // start collapsed
              animate={barCtrl}
            />

            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}px`}
              w="500px"
              alignItems="center"
            >
              <MotionText
                fontSize={{ base: "2xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontFamily="Roboto Slab"
                fontWeight="400"
                letterSpacing="0.08em"
                color="white"
                style={{ x: "-100%" }}
                animate={projCtrl}
                textAlign="left"
              >
                projections
              </MotionText>
            </Box>
          </HStack>

          {/* subdate */}
          <MotionText
            fontSize={{ base: "2xl", md: "4xl" }}
            fontFamily="Magistral"
            color="gray.200"
            fontWeight="600"
            mt={{ base: 1, md: 5 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.6, ease: "easeOut" }}
          >
            September 16–20, 2025
          </MotionText>
        </Box>

        {/* register button */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.5, duration: 0.6, ease: "easeOut" }}
        >
          <Button
            as="a"
            href="/register"
            size={{
              base: "md",
              md: "lg"
            }}
            p={{
              base: 6,
              md: 10
            }}
            bg="#f5bc43ff"
            color="black"
            rounded="lg"
            _hover={{ bg: "gray.800", color: "white" }}
            _active={{ bg: "#EAA001" }}
            boxShadow="lg"
            fontFamily="ProRacing"
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="800"
              fontStyle="italic"
              letterSpacing="0.01em"
            >
              REGISTER
            </Text>
          </Button>
        </MotionBox>
      </VStack>

      {/* bouncing chevron + learn more */}
      {!isShort && (
        <MotionVStack
          position="absolute"
          bottom="30px"
          left="50%"
          transform="translateX(-50%)"
          spacing={0}
          zIndex={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.8, ease: "easeInOut" }}
          cursor="pointer"
          onClick={() => {
            const descriptionSection = document.getElementById("description");
            if (descriptionSection) {
              descriptionSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }}
        >
          <Text
            color="white"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontFamily="Magistral"
            fontWeight="600"
            letterSpacing={1.3}
            mb={-2}
          >
            Learn more
          </Text>
          <MotionBox
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut",
              delay: 4
            }}
          >
            <ChevronDownIcon boxSize={{ base: 8, md: 12 }} color="white" />
          </MotionBox>
        </MotionVStack>
      )}

      {/* bottom gradient bar */}
      <Box
        w="100%"
        h="12px"
        bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
        position="absolute"
        bottom={0}
        left={0}
        zIndex={1}
      />
    </Box>
  );
};
const LandingBackground = () => {
  const controls = useAnimation();

  useEffect(() => {
    // kick off the brightness fade
    void controls.start({
      filter: ["blur(3px) brightness(1)", "blur(3px) brightness(0.7)"],
      transition: { delay: 4.0, duration: 1, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <MotionBox
      position="absolute"
      inset={0}
      initial={{ filter: "blur(3px) brightness(1)" }}
      animate={controls}
    >
      <Player
        autoplay
        loop
        animationData={animationData}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        style={{
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          transform: "scale(1.05)"
        }}
      />
    </MotionBox>
  );
};

export default Landing;
