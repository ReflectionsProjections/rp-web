// credit to : https://www.frontend.fyi/tutorials/making-a-foldable-map-with-framer-motion

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  VStack,
  useBreakpointValue
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRightIcon } from "@chakra-ui/icons";

const PANEL_W = 320;
const PANEL_H = 600;
const PANELS = [-2, -1, 0, 1, 2];

const faqData = [
  {
    question: "What is Reflections | Projections?",
    answer:
      "R|P is a technology conference that brings together students and professionals to explore cutting-edge developments in computer science, programming, and technology innovation."
  },
  {
    question: "Who can attend R|P?",
    answer:
      "The conference is open to students, professionals, researchers, and anyone interested in technology. We welcome attendees from all backgrounds and experience levels."
  },
  {
    question: "When is the event?",
    answer:
      "R|P typically takes place annually in the spring semester. Check our website for the exact dates and schedule for this year's conference."
  },
  {
    question: "How much does it cost?",
    answer:
      "Registration fees vary by attendee type. Students often receive discounted rates, and some events may be free. Visit our registration page for current pricing."
  }
];

const FAQPanel: React.FC<{
  question: string;
  answer: string;
  textColor: string;
}> = ({ question, textColor }) => (
  <VStack spacing={4} align="stretch" h="100%" justify="flex-start" pt={4}>
    <Box>
      <Flex align="center" mb={3}>
        <Text
          fontSize="xl"
          fontWeight="bold"
          color={textColor}
          lineHeight="1.3"
          flex="1"
        >
          {question}
        </Text>
        <ChevronRightIcon color={textColor} boxSize={6} ml={2} />
      </Flex>
      <Box h="1px" bg="gray.300" mb={4} />
    </Box>

    <Box flex="1">
      {Array.from({ length: 10 }).map((_, i) => (
        <Box
          key={i}
          h="2px"
          bg="gray.300"
          mb={3}
          width={i === 0 ? "100%" : i === 9 ? "60%" : "90%"}
        />
      ))}
    </Box>
  </VStack>
);

const FoldableFAQ: React.FC = () => {
  const bg = useColorModeValue("white", "gray.800");
  const altBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadow = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)");
  const textColor = useColorModeValue("gray.800", "white");
  const [open, setOpen] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const deckVariants = {
    closed: {
      scale: 0.96,
      x: "-50%",
      y: "-50%",
      transition: { type: "spring", stiffness: 80, damping: 20 }
    },
    open: {
      scale: 0.82,
      x: "-50%",
      y: "-50%",
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delayChildren: 0.1,
        staggerChildren: 0.18
      }
    }
  };

  const panelVariants = (side: "left" | "right" | "center") => {
    if (isMobile && !(side === "center")) {
      // Mobile: side panels appear below the center panel
      return {
        initial: {
          opacity: 0,
          y: -50
        },
        open: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 70, damping: 16, mass: 0.6 }
        },
        closed: {
          opacity: 0,
          y: -50,
          transition: { duration: 0.4 }
        }
      };
    } else {
      // Desktop: horizontal folding animation
      return {
        initial: {
          rotateY: side === "left" ? -90 : side === "right" ? 90 : 0,
          opacity: side === "center" ? 1 : 0
        },
        open: {
          rotateY: 0,
          opacity: 1,
          transition: { type: "spring", stiffness: 70, damping: 16, mass: 0.6 }
        },
        closed: {
          rotateY: side === "left" ? -90 : side === "right" ? 90 : 0,
          opacity: side === "center" ? 1 : 0,
          transition: { duration: 0.4 }
        }
      };
    }
  };

  const leftOf = (idx: number) => `${idx * PANEL_W}px`;

  if (isMobile) {
    // Mobile layout: vertical stacking
    return (
      <Box
        w="100%"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        py={8}
        px={4}
      >
        {/* Main FAQ Panel */}
        <Box
          width={Math.min(PANEL_W, window.innerWidth - 32)}
          height={PANEL_H * 0.8}
          bg={bg}
          borderRadius={10}
          border={`1px solid ${borderColor}`}
          boxShadow={`0px 5px 15px ${shadow}`}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={8}
          mb={6}
        >
          <Text fontSize="5xl" fontWeight="bold" mb={8} color={textColor}>
            FAQ
          </Text>
          <Box w="80%" h="150px" bg="gray.100" mb={8} borderRadius="md" />
          <Button
            size="lg"
            px={8}
            colorScheme="blue"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "Close" : "Open"}
          </Button>
        </Box>

        {/* Question Panels */}
        <AnimatePresence>
          {open && (
            <VStack spacing={4} w="100%" maxW="400px">
              {faqData.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 70,
                    damping: 16
                  }}
                  style={{ width: "100%" }}
                >
                  <Box
                    w="100%"
                    minH="200px"
                    bg={altBg}
                    borderRadius={10}
                    border={`1px solid ${borderColor}`}
                    boxShadow={`0px 3px 10px ${shadow}`}
                    p={6}
                  >
                    <FAQPanel
                      question={faq.question}
                      answer={faq.answer}
                      textColor={textColor}
                    />
                  </Box>
                </motion.div>
              ))}
            </VStack>
          )}
        </AnimatePresence>
      </Box>
    );
  }

  // Desktop layout: horizontal folding
  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
    >
      <Flex
        justify="center"
        align="center"
        sx={{ perspective: "2400px" }}
        width="100%"
        height="100%"
        position="relative"
      >
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: PANEL_W * PANELS.length,
            height: PANEL_H,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          variants={deckVariants}
          animate={open ? "open" : "closed"}
          initial="closed"
        >
          {PANELS.map((i) => {
            const isCentre = i === 0;
            const side: "left" | "right" | "center" =
              i < 0 ? "left" : i > 0 ? "right" : "center";

            const faqIndex =
              i === -2 ? 0 : i === -1 ? 1 : i === 1 ? 2 : i === 2 ? 3 : 0;
            const faq = faqData[faqIndex];

            return (
              <AnimatePresence key={i}>
                {(isCentre || open) && (
                  <motion.div
                    variants={panelVariants(side)}
                    initial="initial"
                    animate={open ? "open" : "closed"}
                    exit="closed"
                    style={{
                      width: PANEL_W,
                      height: PANEL_H,
                      position: "absolute",
                      left: leftOf(i + 2),
                      top: 0,
                      background: isCentre ? bg : altBg,
                      borderRadius: 10,
                      border: `1px solid ${borderColor}`,
                      boxShadow: `0px 5px 15px ${shadow}`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: isCentre ? "center" : "flex-start",
                      alignItems: "center",
                      padding: 40,
                      transformOrigin: i < 0 ? "right center" : "left center",
                      zIndex: 10 - Math.abs(i)
                    }}
                  >
                    {isCentre ? (
                      <>
                        <Text
                          fontSize="6xl"
                          fontWeight="bold"
                          mb={12}
                          color={textColor}
                        >
                          FAQ
                        </Text>
                        <Box
                          w="80%"
                          h="200px"
                          bg="gray.100"
                          mb={16}
                          borderRadius="md"
                        />
                        <Button
                          size="xl"
                          px={12}
                          py={6}
                          colorScheme="blue"
                          fontSize="lg"
                          onClick={() => setOpen((o) => !o)}
                        >
                          {open ? "Close" : "Open"}
                        </Button>
                      </>
                    ) : (
                      <FAQPanel
                        question={faq.question}
                        answer={faq.answer}
                        textColor={textColor}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </motion.div>
      </Flex>
    </Box>
  );
};

export default FoldableFAQ;
