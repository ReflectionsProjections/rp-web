import {
  Box,
  Flex,
  HStack,
  Text,
  useMediaQuery,
  VStack
} from "@chakra-ui/react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { RaceClock } from "./RaceClock";

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function Title() {
  const [isSmall] = useMediaQuery("(max-width: 500px)");
  const sepH = 40;

  // refs & animation controls
  const barRef = useRef(null);
  const inView = useInView(barRef, { once: false }); // allow repeated triggers
  const barCtrl = useAnimation();
  const refCtrl = useAnimation();
  const projCtrl = useAnimation();
  const dateCtrl = useAnimation();

  // --- main animation sequence ---
  const animateIn = async () => {
    // 1. Bar grows
    await barCtrl.start({
      height: sepH,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
    // 2. Texts slide in
    await Promise.all([
      refCtrl.start({
        x: isSmall ? -10 : -20,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      }),
      projCtrl.start({
        x: isSmall ? 10 : 20,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      })
    ]);
    // 3. Date fades in
    await dateCtrl.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    });
  };

  // --- reverse (hide) sequence ---
  const animateOut = async () => {
    // 1. Date fades out
    await dateCtrl.start({
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" }
    });
    // 2. Texts slide/fade out
    await Promise.all([
      refCtrl.start({
        x: "100%",
        opacity: 0,
        transition: { duration: 0.7, ease: "easeIn" }
      }),
      projCtrl.start({
        x: "-100%",
        opacity: 0,
        transition: { duration: 0.7, ease: "easeIn" }
      })
    ]);
    // 3. Bar shrinks
    await barCtrl.start({
      height: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    });
  };

  const intervalHandler = async () => {
    await animateOut();
    await new Promise((res) => setTimeout(res, 1000)); // pause
    await animateIn();
  };

  // --- loop logic ---
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (inView) {
      // First run: show

      void animateIn();

      // Start interval
      timeout = setInterval(() => {
        void intervalHandler();
      }, 10000); // 10s
    }
    return () => {
      if (timeout) clearInterval(timeout);
    };
    // eslint-disable-next-line
  }, [inView, isSmall, sepH]);

  return (
    <Box width={"100%"} textAlign={"center"}>
      <Flex
        position={"relative"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <VStack flexDir={"column"} alignItems={"center"} gap={0}>
          <HStack justify="center" alignItems="center" gap={0} h="80px">
            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}px`}
              w="500px"
              alignItems="center"
              justifyContent="flex-end"
            >
              <MotionText
                fontSize={"4xl"}
                fontFamily="Roboto Slab"
                fontWeight="600"
                letterSpacing="0.03em"
                color="white"
                style={{ x: "100%" }}
                initial={{ x: "100%", opacity: 0 }}
                animate={refCtrl}
                textAlign="right"
              >
                reflections
              </MotionText>
            </Box>

            <MotionBox
              ref={barRef}
              as="span"
              display="inline-block"
              w={"5px"}
              bg="white"
              borderRadius="1px"
              height={0}
              animate={barCtrl}
              mt={1}
            />

            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}px`}
              w="500px"
              alignItems="center"
            >
              <MotionText
                fontSize={"4xl"}
                fontFamily="Roboto Slab"
                fontWeight="600"
                letterSpacing="0.03em"
                color="white"
                style={{ x: "-100%" }}
                initial={{ x: "-100%", opacity: 0 }}
                animate={projCtrl}
                textAlign="left"
              >
                projections
              </MotionText>
            </Box>
          </HStack>

          <MotionText
            fontSize={"2xl"}
            fontFamily="Magistral"
            color="gray.300"
            fontWeight="600"
            initial={{ opacity: 0, y: -20 }}
            animate={dateCtrl}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            September 16–20, 2025
          </MotionText>
        </VStack>
        <Box position={"absolute"} right={0}>
          <RaceClock />
        </Box>
      </Flex>
    </Box>
  );
}
