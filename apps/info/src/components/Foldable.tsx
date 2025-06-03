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
  useColorModeValue
} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  useSpring,
  AnimatePresence
} from "framer-motion";

const theme = extendTheme({
  styles: { global: { body: { bg: "gray.50" } } }
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac felis eget justo cursus finibus in vel nibh."
  },
  {
    question: "Nulla facilisi mauris vel?",
    answer:
      "Nulla facilisi. Mauris vel erat nec justo cursus auctor. Suspendisse potenti. Sed mattis neque ut ex volutpat."
  },
  {
    question: "Fusce sagittis magna vel?",
    answer:
      "Fusce sagittis magna vel nunc porttitor, nec hendrerit magna posuere. Sed porttitor eros vitae diam finibus."
  },
  {
    question: "Vestibulum ante ipsum primis?",
    answer:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec lacinia sapien in elit."
  },
  {
    question: "Cras at justo sit amet?",
    answer:
      "Cras at justo sit amet erat molestie varius. Integer hendrerit dolor sed eleifend sodales. Phasellus magna elit."
  }
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
    { rotateZ: 90, rotateY: 45, scale: 0.8, rotateX: 0, y: 0, skewY: 0 }
  ];

  const panelShift = [220, 110, 0, -110, -220];
  const globalRotateY = useTransform(xSpring, [0, maxDrag], [0, 3]);
  const globalZ = useTransform(xSpring, [0, maxDrag], [0, 50]);

  const panel0X = useTransform(xSpring, [0, maxDrag], [panelShift[0], 0]);
  const panel0RotateY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[0].rotateY, 0]
  );
  const panel0RotateX = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[0].rotateX, 0]
  );
  const panel0RotateZ = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[0].rotateZ, 0]
  );
  const panel0Scale = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[0].scale, 1]
  );
  const panel0Y = useTransform(xSpring, [0, maxDrag], [windmillEffect[0].y, 0]);
  const panel0SkewY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[0].skewY, 0]
  );
  const panel0Z = useTransform(xSpring, [0, maxDrag], [0, 0 * 15]);
  const panel0Opacity = useTransform(
    xSpring,
    [0, maxDrag * 0.3, maxDrag],
    [0.4, 0.8, 1]
  );

  const panel1X = useTransform(xSpring, [0, maxDrag], [panelShift[1], 0]);
  const panel1RotateY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[1].rotateY, 0]
  );
  const panel1RotateX = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[1].rotateX, 0]
  );
  const panel1RotateZ = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[1].rotateZ, 0]
  );
  const panel1Scale = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[1].scale, 1]
  );
  const panel1Y = useTransform(xSpring, [0, maxDrag], [windmillEffect[1].y, 0]);
  const panel1SkewY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[1].skewY, 0]
  );
  const panel1Z = useTransform(xSpring, [0, maxDrag], [0, 1 * 15]);
  const panel1Opacity = useTransform(
    xSpring,
    [0, maxDrag * 0.3, maxDrag],
    [0.4, 0.8, 1]
  );

  const panel2X = useTransform(xSpring, [0, maxDrag], [panelShift[2], 0]);
  const panel2RotateY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[2].rotateY, 0]
  );
  const panel2RotateX = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[2].rotateX, 0]
  );
  const panel2RotateZ = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[2].rotateZ, 0]
  );
  const panel2Scale = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[2].scale, 1]
  );
  const panel2Y = useTransform(xSpring, [0, maxDrag], [windmillEffect[2].y, 0]);
  const panel2SkewY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[2].skewY, 0]
  );
  const panel2Z = useTransform(xSpring, [0, maxDrag], [0, 2 * 15]);
  const panel2Opacity = useTransform(
    xSpring,
    [0, maxDrag * 0.3, maxDrag],
    [0.4, 0.8, 1]
  );

  const panel3X = useTransform(xSpring, [0, maxDrag], [panelShift[3], 0]);
  const panel3RotateY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[3].rotateY, 0]
  );
  const panel3RotateX = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[3].rotateX, 0]
  );
  const panel3RotateZ = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[3].rotateZ, 0]
  );
  const panel3Scale = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[3].scale, 1]
  );
  const panel3Y = useTransform(xSpring, [0, maxDrag], [windmillEffect[3].y, 0]);
  const panel3SkewY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[3].skewY, 0]
  );
  const panel3Z = useTransform(xSpring, [0, maxDrag], [0, 3 * 15]);
  const panel3Opacity = useTransform(
    xSpring,
    [0, maxDrag * 0.3, maxDrag],
    [0.4, 0.8, 1]
  );

  const panel4X = useTransform(xSpring, [0, maxDrag], [panelShift[4], 0]);
  const panel4RotateY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[4].rotateY, 0]
  );
  const panel4RotateX = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[4].rotateX, 0]
  );
  const panel4RotateZ = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[4].rotateZ, 0]
  );
  const panel4Scale = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[4].scale, 1]
  );
  const panel4Y = useTransform(xSpring, [0, maxDrag], [windmillEffect[4].y, 0]);
  const panel4SkewY = useTransform(
    xSpring,
    [0, maxDrag],
    [windmillEffect[4].skewY, 0]
  );
  const panel4Z = useTransform(xSpring, [0, maxDrag], [0, 4 * 15]);
  const panel4Opacity = useTransform(
    xSpring,
    [0, maxDrag * 0.3, maxDrag],
    [0.4, 0.8, 1]
  );

  const panelTransforms = [
    {
      x: panel0X,
      rotateY: panel0RotateY,
      rotateX: panel0RotateX,
      rotateZ: panel0RotateZ,
      scale: panel0Scale,
      y: panel0Y,
      skewY: panel0SkewY,
      z: panel0Z,
      opacity: panel0Opacity
    },
    {
      x: panel1X,
      rotateY: panel1RotateY,
      rotateX: panel1RotateX,
      rotateZ: panel1RotateZ,
      scale: panel1Scale,
      y: panel1Y,
      skewY: panel1SkewY,
      z: panel1Z,
      opacity: panel1Opacity
    },
    {
      x: panel2X,
      rotateY: panel2RotateY,
      rotateX: panel2RotateX,
      rotateZ: panel2RotateZ,
      scale: panel2Scale,
      y: panel2Y,
      skewY: panel2SkewY,
      z: panel2Z,
      opacity: panel2Opacity
    },
    {
      x: panel3X,
      rotateY: panel3RotateY,
      rotateX: panel3RotateX,
      rotateZ: panel3RotateZ,
      scale: panel3Scale,
      y: panel3Y,
      skewY: panel3SkewY,
      z: panel3Z,
      opacity: panel3Opacity
    },
    {
      x: panel4X,
      rotateY: panel4RotateY,
      rotateX: panel4RotateX,
      rotateZ: panel4RotateZ,
      scale: panel4Scale,
      y: panel4Y,
      skewY: panel4SkewY,
      z: panel4Z,
      opacity: panel4Opacity
    }
  ];

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
            z: globalZ
          }}
          animate={{
            rotateX: isFolded ? 0 : 2
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
              modifyTarget: (t) => (t > maxDrag * 0.45 ? maxDrag : 0)
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
                : "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)"
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
                const transforms = panelTransforms[i];

                return (
                  <MotionBox
                    key={i}
                    style={{
                      x: transforms.x,
                      y: transforms.y,
                      rotateY: transforms.rotateY,
                      rotateX: transforms.rotateX,
                      rotateZ: transforms.rotateZ,
                      skewY: transforms.skewY,
                      scale: transforms.scale,
                      z: transforms.z,
                      opacity: transforms.opacity,
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center"
                    }}
                    borderRight={
                      i < faqItems.length - 1 ? "1px solid" : undefined
                    }
                    borderLeft={i > 0 ? "1px solid" : undefined}
                    borderColor="gray.100"
                    bg={bgColor}
                    boxShadow="xl"
                    overflow="hidden"
                  >
                    <MotionBox
                      p={6}
                      h="full"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      animate={{
                        filter: isFolded ? "brightness(0.8)" : "brightness(1)"
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.03,
                        type: "spring",
                        stiffness: 200
                      }}
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
                                z: -100
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                scale: 1,
                                z: 0
                              }}
                              exit={{
                                opacity: 0,
                                y: -30,
                                rotateX: 20,
                                scale: 0.9,
                                z: -50
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: 0.15 + i * 0.1
                              }}
                              whileHover={{
                                scale: 1.03,
                                y: -3,
                                rotateY: 2,
                                boxShadow: "lg",
                                transition: { duration: 0.2 }
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
                                  rotateY: 0
                                }}
                                transition={{
                                  delay: 0.25 + i * 0.1,
                                  duration: 0.4,
                                  type: "spring"
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
                                  scale: 1
                                }}
                                transition={{
                                  delay: 0.35 + i * 0.1,
                                  duration: 0.5,
                                  type: "spring"
                                }}
                              >
                                {faq.answer}
                              </MotionText>
                            </MotionBox>
                          )}
                        </AnimatePresence>
                      </VStack>
                    </MotionBox>
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
                    rotateY: 5
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <MotionHeading
                    fontSize="7xl"
                    fontWeight="black"
                    color={accent}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotateY: 0
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1
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
                      x: [0, 3, 0]
                    }}
                    transition={{
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      x: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      y: {
                        duration: 0.5,
                        delay: 0.2
                      }
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
