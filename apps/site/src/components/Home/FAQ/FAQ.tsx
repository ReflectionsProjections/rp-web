import { FAQS } from "@/constants/faq";
import { VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import FAQBackdrop from "../../../assets/faq-backdrop.png";
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
    <VStack
      w="100%"
      minH={{
        base: "100dvh",
        md: "90dvh"
      }}
      justifyContent="flex-start"
      bgImage={FAQBackdrop}
      bgColor={"black"}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      gap={10}
    >
      <VStack spacing={0} mb={4} w="100%" overflowX={"hidden"}>
        <FAQHeader selectedFaqIndices={selectedFaqIndices} />
      </VStack>
      <VStack
        maxW="1000px"
        w="100%"
        mx="auto"
        spacing={{
          base: 8,
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
  );
};
