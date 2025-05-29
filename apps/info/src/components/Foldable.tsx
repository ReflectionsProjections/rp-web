// credit to : https://www.frontend.fyi/tutorials/making-a-foldable-map-with-framer-motion

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  VStack,
  ChakraProvider,
  extendTheme,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const theme = extendTheme({
  styles: { global: { body: { bg: "gray.50" } } },
});

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

interface FaqItem {
  question: string;
  answer: string;
}

interface FoldableFAQProps {
  title?: string;
}

const faqItems: FaqItem[] = [
  {
    question: "Lorem ipsum dolor sit amet?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac felis eget justo cursus finibus in vel nibh.",
  },
  {
    question: "Nulla facilisi mauris vel?",
    answer:
      "Nulla facilisi. Mauris vel erat nec justo cursus auctor. Suspendisse potenti. Sed mattis neque ut ex volutpat.",
  },
  {
    question: "Fusce sagittis magna vel?",
    answer:
      "Fusce sagittis magna vel nunc porttitor, nec hendrerit magna posuere. Sed porttitor eros vitae diam finibus.",
  },
  {
    question: "Vestibulum ante ipsum primis?",
    answer:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec lacinia sapien in elit.",
  },
  {
    question: "Cras at justo sit amet?",
    answer:
      "Cras at justo sit amet erat molestie varius. Integer hendrerit dolor sed eleifend sodales. Phasellus magna elit.",
  },
];

const FoldableFAQ: React.FC<FoldableFAQProps> = ({ title = "FAQ" }) => {
  const maxDrag = 380;
  const xDrag = useMotionValue(0);
  const xSpring = useSpring(xDrag, { stiffness: 400, damping: 35 });
  const componentX = useTransform(xSpring, [0, maxDrag], [0, -maxDrag]);
  const [isFolded, setIsFolded] = useState(true);

  useMotionValueEvent(xDrag, "change", (x) => {
    if (x > maxDrag * 0.8 && isFolded) setIsFolded(false);
    if (x < maxDrag * 0.2 && !isFolded) setIsFolded(true);
  });

  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const update = () => {
      const width = Math.min(window.innerWidth * 0.92, 1200);
      const height = width * 0.55;
      setSize({ width, height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const windmillEffect = [
    { rotateZ: -90, rotateY: -45, scale: 0.8, rotateX: 0, y: 0, skewY: 0 },
    { rotateZ: -45, rotateY: -22, scale: 0.9, rotateX: 0, y: 0, skewY: 0 },
    { rotateZ: 0, rotateY: 0, scale: 1, rotateX: 0, y: 0, skewY: 0 },
    { rotateZ: 45, rotateY: 22, scale: 0.9, rotateX: 0, y: 0, skewY: 0 },
    { rotateZ: 90, rotateY: 45, scale: 0.8, rotateX: 0, y: 0, skewY: 0 },
  ];

  const rotationEffect = windmillEffect;

  const panelShift = [220, 110, 0, -110, -220];
  const globalRotateY = useTransform(xSpring, [0, maxDrag], [0, 3]);
  const globalZ = useTransform(xSpring, [0, maxDrag], [0, 50]);

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const accent = useColorModeValue("blue.500", "blue.300");

  return (
    <ChakraProvider theme={theme} resetCSS>
      <Flex
        w="100%"
        h="100vh"
        overflow="hidden"
        align="center"
        justify="center"
      >
        <MotionFlex
          style={{
            x: componentX,
            rotateY: globalRotateY,
            z: globalZ,
          }}
          animate={{
            rotateX: isFolded ? 0 : 2,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MotionBox
            drag="x"
            dragConstraints={{ left: 0, right: maxDrag }}
            dragElastic={0.15}
            dragTransition={{
              power: 0.2,
              timeConstant: 500,
              modifyTarget: (t) => (t > maxDrag * 0.45 ? maxDrag : 0),
            }}
            style={{ x: xDrag, width: size.width, height: size.height }}
            cursor="grab"
            _active={{ cursor: "grabbing" }}
            position="relative"
            borderRadius="lg"
            boxShadow="2xl"
            overflow="hidden"
            bg={bgColor}
            animate={{
              boxShadow: isFolded
                ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
            transition={{ duration: 0.3 }}
          >
            <Box
              display="grid"
              gridTemplateColumns={`repeat(${faqItems.length}, 1fr)`}
              h="full"
              w="full"
            >
              {faqItems.map((faq, i) => {
                const x = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [panelShift[i], 0]
                );

                const rotateY = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].rotateY, 0]
                );
                const rotateX = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].rotateX, 0]
                );
                const rotateZ = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].rotateZ, 0]
                );
                const panelScale = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].scale, 1]
                );
                const panelY = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].y, 0]
                );
                const skewY = useTransform(
                  xSpring,
                  [0, maxDrag],
                  [rotationEffect[i].skewY, 0]
                );

                const panelZ = useTransform(xSpring, [0, maxDrag], [0, i * 15]);
                const opacity = useTransform(
                  xSpring,
                  [0, maxDrag * 0.3, maxDrag],
                  [0.4, 0.8, 1]
                );

                return (
                  <MotionBox
                    key={i}
                    style={{
                      x,
                      y: panelY,
                      rotateY,
                      rotateX,
                      rotateZ,
                      skewY,
                      scale: panelScale,
                      z: panelZ,
                      opacity,
                      transformStyle: "preserve-3d" as any,
                      transformOrigin: "center center",
                    }}
                    borderRight={
                      i < faqItems.length - 1 ? "1px solid" : undefined
                    }
                    borderLeft={i > 0 ? "1px solid" : undefined}
                    borderColor="gray.100"
                    bg={bgColor}
                    boxShadow="xl"
                    overflow="hidden"
                    animate={{
                      filter: isFolded ? "brightness(0.8)" : "brightness(1)",
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.03,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <Box
                      p={6}
                      h="full"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <VStack spacing={4} align="stretch">
                        <AnimatePresence mode="wait">
                          {!isFolded && (
                            <MotionBox
                              bg={cardBg}
                              p={4}
                              borderRadius="md"
                              boxShadow="md"
                              initial={{
                                opacity: 0,
                                y: 40,
                                rotateX: -30,
                                scale: 0.8,
                                z: -100,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                scale: 1,
                                z: 0,
                                transition: {
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                  delay: 0.15 + i * 0.1,
                                },
                              }}
                              exit={{
                                opacity: 0,
                                y: -30,
                                rotateX: 20,
                                scale: 0.9,
                                z: -50,
                                transition: {
                                  duration: 0.25,
                                  delay: (faqItems.length - i - 1) * 0.05,
                                },
                              }}
                              whileHover={{
                                scale: 1.03,
                                y: -3,
                                rotateY: 2,
                                boxShadow: "lg",
                                transition: { duration: 0.2 },
                              }}
                            >
                              <MotionHeading
                                fontSize="lg"
                                mb={2}
                                color={accent}
                                initial={{ opacity: 0, x: -15, rotateY: -10 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  rotateY: 0,
                                  transition: {
                                    delay: 0.25 + i * 0.1,
                                    duration: 0.4,
                                    type: "spring",
                                  },
                                }}
                              >
                                {faq.question}
                              </MotionHeading>
                              <MotionText
                                fontSize="sm"
                                color={textColor}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  scale: 1,
                                  transition: {
                                    delay: 0.35 + i * 0.1,
                                    duration: 0.5,
                                    type: "spring",
                                  },
                                }}
                              >
                                {faq.answer}
                              </MotionText>
                            </MotionBox>
                          )}
                        </AnimatePresence>
                      </VStack>
                    </Box>
                  </MotionBox>
                );
              })}
            </Box>

            <AnimatePresence>
              {isFolded && (
                <MotionBox
                  position="absolute"
                  inset={0}
                  bg={bgColor}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  pointerEvents="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.4 },
                  }}
                >
                  <MotionHeading
                    fontSize="7xl"
                    fontWeight="black"
                    color={accent}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotateY: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      },
                    }}
                  >
                    {title}
                  </MotionHeading>
                  <MotionText
                    mt={4}
                    color="gray.500"
                    fontSize="md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      y: 0,
                      x: [0, 3, 0],
                    }}
                    transition={{
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 0.5, delay: 0.2 },
                    }}
                  >
                    Drag to open →
                  </MotionText>
                </MotionBox>
              )}
            </AnimatePresence>
          </MotionBox>
        </MotionFlex>
      </Flex>
    </ChakraProvider>
  );
};

export default FoldableFAQ;
