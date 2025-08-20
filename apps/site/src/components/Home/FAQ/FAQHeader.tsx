import { FAQS } from "@/constants/faq-questions";
import { Box, HStack, VStack } from "@chakra-ui/react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StopLight } from "./StopLight";
import { AnimatedHeader } from "../shared/AnimatedHeader";

const MotionBox = motion(Box);

export const FAQHeader: React.FC<{
  selectedFaqIndices: Set<number>;
}> = ({ selectedFaqIndices }) => {
  // ref to trigger when header comes into view
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box position="relative" w="100%" overflow="hidden" pt={20} ref={ref}>
      <HStack
        w="100%"
        p={2}
        pt={0}
        alignItems="flex-start"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        <VStack spacing={0}>
          <AnimatedHeader>FAQ</AnimatedHeader>

          <HStack gap={0}>
            {FAQS.map((_, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: -30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + (FAQS.length - index) * 0.1,
                  ease: "easeOut"
                }}
              >
                <StopLight
                  active={selectedFaqIndices.has(index)}
                  hasBar={index < FAQS.length - 1}
                />
              </MotionBox>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
