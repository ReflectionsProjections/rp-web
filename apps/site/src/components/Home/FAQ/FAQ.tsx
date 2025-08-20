import { FAQS } from "@/constants/faq-questions";
import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import { FAQHeader } from "./FAQHeader";
import { FAQQuestion } from "./FAQQuestion";

export const FAQ: React.FC = () => {
  const [selectedFaqIndices, setSelectedFaqIndices] = useState<Set<number>>(
    new Set()
  );

  const handleFaqToggle = (index: number) => {
    setSelectedFaqIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <>
      <VStack
        w="100%"
        minH={"100dvh"}
        justifyContent="flex-start"
        bgImage={`
          linear-gradient(
            to bottom,
            #100E0E 0%,
            rgba(45,39,39,0) 20%,
            rgba(45,39,39,0) 80%,
            #100E0E 100%
          ),
          url("/faq/faq-backdrop.png")
        `}
        bgColor={"#2d2727ff"}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        overflowX="hidden"
        gap={3}
        pb={20}
        pt={20}
      >
        <VStack spacing={0} mb={4} w="100%" overflowX={"hidden"}>
          <FAQHeader selectedFaqIndices={selectedFaqIndices} />
        </VStack>
        <VStack
          maxW="850px"
          w="100%"
          mx="auto"
          spacing={{
            base: 5,
            md: 5
          }}
        >
          {FAQS.map((faqItem, index) => (
            <FAQQuestion
              key={`faq-item-${index}`}
              index={index}
              faqItem={faqItem}
              onFaqToggle={handleFaqToggle}
            />
          ))}
        </VStack>
      </VStack>
    </>
  );
};
