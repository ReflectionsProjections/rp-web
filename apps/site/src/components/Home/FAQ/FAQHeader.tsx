import { FAQS } from "@/constants/faq-questions";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { StopLight } from "./StopLight";

export const FAQHeader: React.FC<{
  selectedFaqIndices: Set<number>;
}> = ({ selectedFaqIndices }) => {
  return (
    <Box position="relative" w="100%" overflow="hidden">
      <Image
        src={"/faq/faq-header-left-bars.svg"}
        position="absolute"
        top={{ base: 0, md: -5 }}
        left={{ base: -5, md: 0 }}
        h={{ base: "50px", sm: "75px", md: "100px", lg: "140px" }}
        opacity={0.9}
        zIndex={0}
      />

      <Image
        src={"/faq/faq-header-right-bars.svg"}
        position="absolute"
        top={{ base: 0, md: -0 }}
        right={{ base: -14, sm: -14, md: -90 }}
        h={{ base: "50px", sm: "75px", md: "100px", lg: "140px" }}
        opacity={0.9}
        zIndex={0}
      />

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
          <Text
            fontSize="7xl"
            fontWeight="bold"
            fontStyle="italic"
            color="white"
            fontFamily="ProRacingSlant"
          >
            FAQ
          </Text>

          <HStack gap={0}>
            {FAQS.map((_, index) => (
              <StopLight
                key={index}
                active={selectedFaqIndices.has(index)}
                hasBar={index < FAQS.length - 1}
              />
            ))}
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
