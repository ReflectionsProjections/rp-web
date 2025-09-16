import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { RaceClock } from "./RaceClock";

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function Title() {
  const sepH = 4;

  const barRef = useRef(null);
  const inView = useInView(barRef, { once: false }); // allow repeated triggers
  const barCtrl = useAnimation();
  const refCtrl = useAnimation();
  const projCtrl = useAnimation();
  const dateCtrl = useAnimation();

  const animateIn = async () => {
    await barCtrl.start({
      height: `${sepH}vh`,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
    await Promise.all([
      refCtrl.start({
        x: "-1.5vw",
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      }),
      projCtrl.start({
        x: "1.5vw",
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" }
      })
    ]);
    await dateCtrl.start({
      opacity: 1,
      y: "0vh",
      transition: { duration: 0.6, ease: "easeOut" }
    });
  };

  const animateOut = async () => {
    await dateCtrl.start({
      opacity: 0,
      y: "-1vh",
      transition: { duration: 0.4, ease: "easeIn" }
    });
    await Promise.all([
      refCtrl.start({
        x: "30vw",
        opacity: 0,
        transition: { duration: 0.7, ease: "easeIn" }
      }),
      projCtrl.start({
        x: "-30vw",
        opacity: 0,
        transition: { duration: 0.7, ease: "easeIn" }
      })
    ]);
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

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (inView) {
      void animateIn();

      timeout = setInterval(() => {
        void intervalHandler();
      }, 10000); // 10s
    }
    return () => {
      if (timeout) clearInterval(timeout);
    };
    // eslint-disable-next-line
  }, [inView, sepH]);

  return (
    <Box width={"100%"} textAlign={"center"}>
      <Flex
        position={"relative"}
        flexDirection={"row"}
        justifyContent={"center"}
      >
        <VStack flexDir={"column"} alignItems={"center"} gap={0}>
          <HStack justify="center" alignItems="center" gap={0} h="6vh">
            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}vh`}
              w="40vw"
              alignItems="center"
              justifyContent="flex-end"
            >
              <MotionText
                fontSize={"3vh"}
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
              w={"0.2vw"}
              bg="white"
              borderRadius="1px"
              height={0}
              animate={barCtrl}
              mt={1}
            />

            <Box
              display="flex"
              overflow="hidden"
              h={`${sepH}vh`}
              w="40vw"
              alignItems="center"
            >
              <MotionText
                fontSize={"3vh"}
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
            fontSize={"3vh"}
            fontFamily="Magistral"
            color="gray.300"
            fontWeight="600"
            initial={{ opacity: 0, y: "-2vh" }}
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
