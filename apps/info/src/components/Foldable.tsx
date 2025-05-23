// credit to : https://www.frontend.fyi/tutorials/making-a-foldable-map-with-framer-motion

import React, { useState } from "react";
import { Box, Flex, Text, Button, useColorModeValue } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const PANEL_W = 250;
const PANEL_H = 480;
const PANELS = [-2, -1, 0, 1, 2];

const FoldableFAQ: React.FC = () => {
  const bg = useColorModeValue("white", "gray.800");
  const altBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const shadow = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)");
  const [open, setOpen] = useState(false);

  const deckVariants = {
    closed: {
      scale: 0.96,
      x: "-50%",
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
    open: {
      scale: 0.82,
      x: "-50%", // STILL CENTER IT ONCE WE OPEN
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delayChildren: 0.1,
        staggerChildren: 0.18,
      },
    },
  };

  const panelVariants = (side: "left" | "right" | "center") => ({
    initial: {
      rotateY: side === "left" ? -90 : side === "right" ? 90 : 0,
      opacity: side === "center" ? 1 : 0,
    },
    open: {
      rotateY: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, damping: 16, mass: 0.6 },
    },
    closed: {
      rotateY: side === "left" ? -90 : side === "right" ? 90 : 0,
      opacity: side === "center" ? 1 : 0,
      transition: { duration: 0.4 },
    },
  });

  const leftOf = (idx: number) => `${idx * PANEL_W}px`;
  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
      py={10}
      overflow="hidden"
      position="relative"
    >
      <Flex
        justify="center"
        align="center"
        sx={{ perspective: "2400px" }}
        width="100%"
        height={`${PANEL_H}px`}
        position="relative"
      >
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            width: PANEL_W * PANELS.length,
            height: PANEL_H,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
          variants={deckVariants}
          animate={open ? "open" : "closed"}
          initial="closed"
        >
          {PANELS.map((i) => {
            const isCentre = i === 0;
            const side: "left" | "right" | "center" =
              i < 0 ? "left" : i > 0 ? "right" : "center";

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
                      background: isCentre ? bg : altBg,
                      borderRadius: 10,
                      border: `1px solid ${borderColor}`,
                      boxShadow: `0px 5px 15px ${shadow}`,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 30,
                      transformOrigin: i < 0 ? "right center" : "left center",
                      zIndex: 10 - Math.abs(i),
                    }}
                  >
                    {isCentre ? (
                      <>
                        <Text fontSize="5xl" fontWeight="bold" mb={10}>
                          FAQ
                        </Text>
                        <Box
                          w="80%"
                          h="180px"
                          bg="gray.100"
                          mb={12}
                          borderRadius="md"
                        />
                        <Button
                          size="lg"
                          px={8}
                          colorScheme="blue"
                          onClick={() => setOpen((o) => !o)}
                        >
                          {open ? "Close" : "Open"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Box
                          w="90%"
                          h="120px"
                          bg="gray.100"
                          mb={6}
                          mt={8}
                          mx="auto"
                          borderRadius="md"
                        />
                        <Box
                          w="90%"
                          h="calc(100% - 160px)"
                          bg="gray.100"
                          mx="auto"
                          borderRadius="md"
                        />
                      </>
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
