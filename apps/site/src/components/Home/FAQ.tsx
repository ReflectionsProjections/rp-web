import {
  Box,
  Circle,
  Collapse,
  HStack,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import Car1 from "../../assets/car1.svg";
import Car2 from "../../assets/car2.svg";
import Car3 from "../../assets/car3.svg";
import Car4 from "../../assets/car4.svg";
import Car5 from "../../assets/car5.svg";
import { FAQS, FAQItem } from "@/constants/faq";

const cars = [Car1, Car2, Car3, Car4, Car5];

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
      p={{
        base: 4,
        md: undefined
      }}
    >
      <VStack spacing={0} mb={4}>
        <HStack w="100%" bgColor="gray.200" p={2} justifyContent={"center"}>
          <Text fontSize="4xl" fontWeight="bold" fontStyle={"italic"}>
            FAQ
          </Text>
        </HStack>
        <HStack gap={3}>
          {FAQS.map((_, index) => {
            return (
              <StopLight
                key={`stop-light-${index}`}
                active={selectedFaqIndices.has(index)}
              />
            );
          })}
        </HStack>
      </VStack>
      <VStack
        maxW="1000px"
        w="100%"
        mx="auto"
        spacing={{
          base: 8,
          md: 12
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

type StopLightProps = {
  active: boolean;
};

const StopLight: React.FC<StopLightProps> = ({ active }) => {
  return (
    <VStack p={2} bgColor="gray.200" gap={4}>
      <Circle
        size={7}
        bgColor={active ? "green.400" : "gray.500"}
        transition={"all 0.1s ease-in"}
      />
      <Circle
        size={7}
        bgColor={active ? "green.400" : "gray.500"}
        transition={"all 0.1s ease-in"}
      />
    </VStack>
  );
};

type FAQQuestionProps = {
  index: number;
  faqItem: FAQItem;
  onFaqToggle: (index: number) => void;
};

const FAQQuestion: React.FC<FAQQuestionProps> = ({
  index,
  faqItem: { question, answer },
  onFaqToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onFaqToggle(index);
  };

  return (
    <Box w="100%">
      <Box
        position={"relative"}
        display="flex"
        alignItems={{ md: "center" }}
        justifyContent={"flex-start"}
        bgColor="gray.200"
        w="100%"
        maxW="1000px"
        p={4}
        py={3}
        h={{
          base: "65px",
          md: "60px"
        }}
        pt={{
          base: 2,
          md: undefined
        }}
        borderRadius={"lg"}
        borderBottomRadius={isOpen ? 0 : "lg"}
        onClick={handleToggle}
        cursor="pointer"
      >
        <Image
          position="absolute"
          left={{
            base: isOpen ? "62%" : -1,
            sm: isOpen ? "70%" : -3,
            md: isOpen ? "72%" : -5
          }}
          bottom={{
            base: 0,
            md: undefined
          }}
          borderRadius="lg"
          h={{
            base: "30px",
            md: "60px"
          }}
          transition={"left 0.3s ease-in-out"}
          src={cars[index % cars.length]}
          alt="Car"
          objectFit="cover"
          transform={{ md: "scale(1.05)" }}
          zIndex="99999"
        ></Image>
        <Text
          ml={{
            md: isOpen ? 0 : "270px"
          }}
          mr={{
            md: isOpen ? 28 : 0
          }}
          pl={{
            base: 1,
            md: 2
          }}
          maxH="100%"
          overflow="hidden"
          fontWeight={"bold"}
          fontSize="xl"
        >
          {question}
        </Text>
      </Box>
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Box bg="gray.50" p={4} borderBottomRadius="lg">
          <Text>{answer}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};
