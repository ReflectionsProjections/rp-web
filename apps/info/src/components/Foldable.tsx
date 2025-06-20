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
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        const width = Math.min(window.innerWidth * 0.9, 400);
        const height = Math.min(window.innerHeight * 0.8, 700); //changed from 0.7, 600
        setSize({ width, height });
      } else {
        const width = Math.min(window.innerWidth * 0.92, 1200);
        const height = width * 0.55;
        setSize({ width, height });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");
  const accent = useColorModeValue("blue.500", "blue.300");

  if (isMobile) {
    return (
      <MobileFoldableFAQ
        title={title}
        size={size}
        bgColor={bgColor}
        cardBg={cardBg}
        textColor={textColor}
        accent={accent}
      />
    );
  }

  return (
    <DesktopFoldableFAQ
      title={title}
      size={size}
      bgColor={bgColor}
      cardBg={cardBg}
      textColor={textColor}
      accent={accent}
    />
  );
};

const DesktopFoldableFAQ: React.FC<{
  title: string;
  size: { width: number; height: number };
  bgColor: string;
  cardBg: string;
  textColor: string;
  accent: string;
}> = ({ title, size, bgColor, cardBg, textColor, accent }) => {
  const maxDrag = 380;
  const xDrag = useMotionValue(0);
  const xSpring = useSpring(xDrag, { stiffness: 400, damping: 35 });
  const componentX = useTransform(xSpring, [0, maxDrag], [0, -maxDrag]);
  const [isFolded, setIsFolded] = useState(true);

  useMotionValueEvent(xDrag, "change", (x) => {
    if (x > maxDrag * 0.8 && isFolded) setIsFolded(false);
    if (x < maxDrag * 0.2 && !isFolded) setIsFolded(true);
  });

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

  // Create transforms for each panel individually
  const panel0Transforms = {
    x: useTransform(xSpring, [0, maxDrag], [panelShift[0], 0]),
    rotateY: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[0].rotateY, 0]
    ),
    rotateX: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[0].rotateX, 0]
    ),
    rotateZ: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[0].rotateZ, 0]
    ),
    scale: useTransform(xSpring, [0, maxDrag], [windmillEffect[0].scale, 1]),
    y: useTransform(xSpring, [0, maxDrag], [windmillEffect[0].y, 0]),
    skewY: useTransform(xSpring, [0, maxDrag], [windmillEffect[0].skewY, 0]),
    z: useTransform(xSpring, [0, maxDrag], [0, 0 * 15]),
    opacity: useTransform(xSpring, [0, maxDrag * 0.3, maxDrag], [0.4, 0.8, 1])
  };

  const panel1Transforms = {
    x: useTransform(xSpring, [0, maxDrag], [panelShift[1], 0]),
    rotateY: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[1].rotateY, 0]
    ),
    rotateX: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[1].rotateX, 0]
    ),
    rotateZ: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[1].rotateZ, 0]
    ),
    scale: useTransform(xSpring, [0, maxDrag], [windmillEffect[1].scale, 1]),
    y: useTransform(xSpring, [0, maxDrag], [windmillEffect[1].y, 0]),
    skewY: useTransform(xSpring, [0, maxDrag], [windmillEffect[1].skewY, 0]),
    z: useTransform(xSpring, [0, maxDrag], [0, 1 * 15]),
    opacity: useTransform(xSpring, [0, maxDrag * 0.3, maxDrag], [0.4, 0.8, 1])
  };

  const panel2Transforms = {
    x: useTransform(xSpring, [0, maxDrag], [panelShift[2], 0]),
    rotateY: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[2].rotateY, 0]
    ),
    rotateX: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[2].rotateX, 0]
    ),
    rotateZ: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[2].rotateZ, 0]
    ),
    scale: useTransform(xSpring, [0, maxDrag], [windmillEffect[2].scale, 1]),
    y: useTransform(xSpring, [0, maxDrag], [windmillEffect[2].y, 0]),
    skewY: useTransform(xSpring, [0, maxDrag], [windmillEffect[2].skewY, 0]),
    z: useTransform(xSpring, [0, maxDrag], [0, 2 * 15]),
    opacity: useTransform(xSpring, [0, maxDrag * 0.3, maxDrag], [0.4, 0.8, 1])
  };

  const panel3Transforms = {
    x: useTransform(xSpring, [0, maxDrag], [panelShift[3], 0]),
    rotateY: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[3].rotateY, 0]
    ),
    rotateX: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[3].rotateX, 0]
    ),
    rotateZ: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[3].rotateZ, 0]
    ),
    scale: useTransform(xSpring, [0, maxDrag], [windmillEffect[3].scale, 1]),
    y: useTransform(xSpring, [0, maxDrag], [windmillEffect[3].y, 0]),
    skewY: useTransform(xSpring, [0, maxDrag], [windmillEffect[3].skewY, 0]),
    z: useTransform(xSpring, [0, maxDrag], [0, 3 * 15]),
    opacity: useTransform(xSpring, [0, maxDrag * 0.3, maxDrag], [0.4, 0.8, 1])
  };

  const panel4Transforms = {
    x: useTransform(xSpring, [0, maxDrag], [panelShift[4], 0]),
    rotateY: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[4].rotateY, 0]
    ),
    rotateX: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[4].rotateX, 0]
    ),
    rotateZ: useTransform(
      xSpring,
      [0, maxDrag],
      [windmillEffect[4].rotateZ, 0]
    ),
    scale: useTransform(xSpring, [0, maxDrag], [windmillEffect[4].scale, 1]),
    y: useTransform(xSpring, [0, maxDrag], [windmillEffect[4].y, 0]),
    skewY: useTransform(xSpring, [0, maxDrag], [windmillEffect[4].skewY, 0]),
    z: useTransform(xSpring, [0, maxDrag], [0, 4 * 15]),
    opacity: useTransform(xSpring, [0, maxDrag * 0.3, maxDrag], [0.4, 0.8, 1])
  };

  const panelTransforms = [
    panel0Transforms,
    panel1Transforms,
    panel2Transforms,
    panel3Transforms,
    panel4Transforms
  ];

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
          animate={{ rotateX: isFolded ? 0 : 2 }}
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
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
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
                                animate={{ opacity: 1, y: 0, scale: 1 }}
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
                  exit={{ opacity: 0, scale: 1.05, rotateY: 5 }}
                  transition={{ duration: 0.4 }}
                >
                  <MotionHeading
                    fontSize="7xl"
                    fontWeight="black"
                    color={accent}
                    initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
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
                      x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                      y: { duration: 0.5, delay: 0.2 }
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

const MobileFoldableFAQ: React.FC<{
  title: string;
  size: { width: number; height: number };
  bgColor: string;
  cardBg: string;
  textColor: string;
  accent: string;
}> = ({ title, size, bgColor, cardBg, textColor, accent }) => {
  const maxDrag = 300;
  const yDrag = useMotionValue(0);
  const ySpring = useSpring(yDrag, { stiffness: 400, damping: 35 });
  const componentY = useTransform(ySpring, [0, maxDrag], [0, -maxDrag]);

  const [isFolded, setIsFolded] = useState(true);

  useMotionValueEvent(yDrag, "change", (y) => {
    if (y > maxDrag * 0.7 && isFolded) setIsFolded(false);
    if (y < maxDrag * 0.3 && !isFolded) setIsFolded(true);
  });

  const stackEffect = [
    { y: -120, scale: 0.85, rotateX: 20, opacity: 0.6 },
    { y: -60, scale: 0.9, rotateX: 15, opacity: 0.7 },
    { y: 0, scale: 1, rotateX: 0, opacity: 1 },
    { y: 60, scale: 0.9, rotateX: -15, opacity: 0.7 },
    { y: 120, scale: 0.85, rotateX: -20, opacity: 0.6 }
  ];

  // Create transforms for each panel individually
  const panel0Transforms = {
    y: useTransform(ySpring, [0, maxDrag], [stackEffect[0].y, 0]),
    scale: useTransform(ySpring, [0, maxDrag], [stackEffect[0].scale, 1]),
    rotateX: useTransform(ySpring, [0, maxDrag], [stackEffect[0].rotateX, 0]),
    opacity: useTransform(
      ySpring,
      [0, maxDrag * 0.3, maxDrag],
      [stackEffect[0].opacity, 0.8, 1]
    ),
    z: useTransform(ySpring, [0, maxDrag], [-(0 * 10), 0 * 5])
  };

  const panel1Transforms = {
    y: useTransform(ySpring, [0, maxDrag], [stackEffect[1].y, 0]),
    scale: useTransform(ySpring, [0, maxDrag], [stackEffect[1].scale, 1]),
    rotateX: useTransform(ySpring, [0, maxDrag], [stackEffect[1].rotateX, 0]),
    opacity: useTransform(
      ySpring,
      [0, maxDrag * 0.3, maxDrag],
      [stackEffect[1].opacity, 0.8, 1]
    ),
    z: useTransform(ySpring, [0, maxDrag], [-(1 * 10), 1 * 5])
  };

  const panel2Transforms = {
    y: useTransform(ySpring, [0, maxDrag], [stackEffect[2].y, 0]),
    scale: useTransform(ySpring, [0, maxDrag], [stackEffect[2].scale, 1]),
    rotateX: useTransform(ySpring, [0, maxDrag], [stackEffect[2].rotateX, 0]),
    opacity: useTransform(
      ySpring,
      [0, maxDrag * 0.3, maxDrag],
      [stackEffect[2].opacity, 0.8, 1]
    ),
    z: useTransform(ySpring, [0, maxDrag], [-(2 * 10), 2 * 5])
  };

  const panel3Transforms = {
    y: useTransform(ySpring, [0, maxDrag], [stackEffect[3].y, 0]),
    scale: useTransform(ySpring, [0, maxDrag], [stackEffect[3].scale, 1]),
    rotateX: useTransform(ySpring, [0, maxDrag], [stackEffect[3].rotateX, 0]),
    opacity: useTransform(
      ySpring,
      [0, maxDrag * 0.3, maxDrag],
      [stackEffect[3].opacity, 0.8, 1]
    ),
    z: useTransform(ySpring, [0, maxDrag], [-(3 * 10), 3 * 5])
  };

  const panel4Transforms = {
    y: useTransform(ySpring, [0, maxDrag], [stackEffect[4].y, 0]),
    scale: useTransform(ySpring, [0, maxDrag], [stackEffect[4].scale, 1]),
    rotateX: useTransform(ySpring, [0, maxDrag], [stackEffect[4].rotateX, 0]),
    opacity: useTransform(
      ySpring,
      [0, maxDrag * 0.3, maxDrag],
      [stackEffect[4].opacity, 0.8, 1]
    ),
    z: useTransform(ySpring, [0, maxDrag], [-(4 * 10), 4 * 5])
  };

  const panelTransforms = [
    panel0Transforms,
    panel1Transforms,
    panel2Transforms,
    panel3Transforms,
    panel4Transforms
  ];

  const globalRotateX = useTransform(ySpring, [0, maxDrag], [0, -2]);
  const globalZ = useTransform(ySpring, [0, maxDrag], [0, 30]);

  return (
    <ChakraProvider theme={theme} resetCSS>
      {/* FIXED: Added justify="center" for proper centering */}
      <Flex
        w="100%"
        h="100vh"
        overflow="hidden"
        align="center"
        justify="center"
        px={4}
      >
        <MotionFlex
          style={{
            y: componentY,
            rotateX: globalRotateX,
            z: globalZ
          }}
          animate={{
            rotateY: isFolded ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <MotionBox
            drag="y"
            dragConstraints={{ top: 0, bottom: maxDrag }}
            dragElastic={0.15}
            dragTransition={{
              power: 0.2,
              timeConstant: 500,
              modifyTarget: (t) => (t > maxDrag * 0.5 ? maxDrag : 0)
            }}
            style={{
              y: yDrag,
              width: size.width,
              height: size.height
            }}
            cursor="grab"
            _active={{ cursor: "grabbing" }}
            position="relative"
            borderRadius="xl"
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
            {/* Panels container - uses grid layout like desktop */}
            <Box
              display="grid"
              gridTemplateRows={`repeat(${faqItems.length}, 1fr)`}
              h="full"
              w="full"
            >
              {faqItems.map((faq, i) => {
                const transforms = panelTransforms[i];

                return (
                  <MotionBox
                    key={i}
                    style={{
                      y: transforms.y,
                      scale: transforms.scale,
                      rotateX: transforms.rotateX,
                      opacity: transforms.opacity,
                      z: transforms.z,
                      transformStyle: "preserve-3d",
                      transformOrigin: "center center"
                    }}
                    borderBottom={
                      i < faqItems.length - 1 ? "1px solid" : undefined
                    }
                    borderTop={i > 0 ? "1px solid" : undefined}
                    borderColor="gray.100"
                    bg={bgColor}
                    boxShadow="lg"
                    overflow="hidden"
                  >
                    <MotionBox
                      p={3}
                      h="full"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      animate={{
                        filter: isFolded ? "brightness(0.85)" : "brightness(1)"
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <VStack spacing={2} align="stretch">
                        <AnimatePresence mode="wait">
                          {!isFolded && (
                            <MotionBox
                              bg={cardBg}
                              p={3}
                              borderRadius="md"
                              boxShadow="md"
                              initial={{
                                opacity: 0,
                                y: 30,
                                rotateX: -20,
                                scale: 0.9,
                                z: -50
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
                                y: -20,
                                rotateX: 15,
                                scale: 0.95,
                                z: -30
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: 0.1 + i * 0.08
                              }}
                              whileHover={{
                                scale: 1.02,
                                y: -2,
                                rotateX: 1,
                                boxShadow: "lg",
                                transition: { duration: 0.2 }
                              }}
                            >
                              <MotionHeading
                                fontSize="sm"
                                mb={2}
                                color={accent}
                                fontWeight="bold"
                                lineHeight="1.3"
                                initial={{ opacity: 0, y: -10, rotateX: -5 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                  delay: 0.2 + i * 0.08,
                                  duration: 0.4,
                                  type: "spring"
                                }}
                              >
                                {faq.question}
                              </MotionHeading>
                              <MotionText
                                fontSize="xs"
                                color={textColor}
                                lineHeight="1.4"
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  delay: 0.3 + i * 0.08,
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

            {/* Folded state overlay */}
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
                    rotateX: 3
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <MotionHeading
                    fontSize="4xl"
                    fontWeight="black"
                    color={accent}
                    initial={{ scale: 0.8, opacity: 0, rotateX: -5 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotateX: 0
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
                    fontSize="sm"
                    fontWeight="medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      y: [0, -3, 0]
                    }}
                    transition={{
                      opacity: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    Swipe down to open ↓
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
