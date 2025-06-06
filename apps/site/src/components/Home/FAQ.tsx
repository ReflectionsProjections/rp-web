import { Box, Circle, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Reflections | Projections?",
    answer:
      "Reflections | Projections (R|P) is the largest student-run tech conference in the Midwest, bringing together students, industry leaders, and professionals from all over the world. Join us for an exciting week of speaker talks, workshops, a career fair, and other intriguing opportunities! All of R|P is designed to allow participants to reflect upon their experiences and project towards their future."
  },
  {
    question: "What do I need to do before R|P?",
    answer:
      "It's simple: register (it's completely free!). Just like that, you're all set to attend events and retrieve free swag/merch!"
  },
  {
    question: "Where are R|P's events held?",
    answer:
      "Every event of R|P 2024 will be held in the Siebel Center for Computer Science (201 N Goodwin Ave, Urbana, IL 61801). Our calendar contains the specific room for each event."
  },
  {
    question: "Who can attend R|P?",
    answer:
      "R|P is open to everyone over the age of 18. Registering and attending R|P is open to all majors and class levels and is completely free!"
  },
  {
    question: "What is the pixel system?",
    answer:
      "The pixel system is our new way of rewarding dedicated R|P attendees with exclusive merch and prizes. Attending events throughout R|P will earn you pixels, and pixels can be redeemed for various free prizes. You can monitor your pixel status on the myRP tab after logging in on the website."
  },
  {
    question: "What are MechMania and PuzzleBang?",
    answer: `MechMania is R|P's 24 hour AI hackathon that allows students to work in teams to build a bot that can play a new game. MechMania is open to all levels of coding and you can register at mechmania.org. PuzzleBang is both a series of puzzles during the week of R|P (Monday - Saturday) and also an escape room on Saturday. You can register at puzzlebang.com.`
  }
];

export const FAQ: React.FC = () => {
  const [hoveredFaqIndex, setHoveredFaqIndex] = useState<number | null>(null);

  const handleFaqHover = (index: number | null) => {
    setHoveredFaqIndex(index);
  };

  return (
    <VStack>
      <VStack spacing={0} mb={4}>
        <HStack w="100%" bgColor="gray.200" p={2} justifyContent={"center"}>
          <Text fontSize="2xl" fontWeight="bold" fontStyle={"italic"}>
            FAQ
          </Text>
        </HStack>
        <HStack>
          {faqs.map((_, index) => {
            return (
              <StopLight
                key={`stop-light-${index}`}
                hovered={hoveredFaqIndex === index}
              />
            );
          })}
        </HStack>
      </VStack>
      <VStack maxW="1000px" w="100%" mx="auto" spacing={4}>
        {faqs.map((faqItem, index) => (
          <FAQItem
            key={`faq-item-${index}`}
            index={index}
            faqItem={faqItem}
            onFaqHover={handleFaqHover}
          />
        ))}
      </VStack>
    </VStack>
  );
};

const StopLight: React.FC<{
  hovered: boolean;
}> = ({ hovered }) => {
  return (
    <VStack p={2} bgColor="gray.200">
      <Circle
        size={5}
        bgColor={hovered ? "gray.800" : "gray.500"}
        transition={"all 0.1s ease-in"}
      />
      <Circle
        size={5}
        bgColor={hovered ? "gray.800" : "gray.500"}
        transition={"all 0.1s ease-in"}
      />
    </VStack>
  );
};

const FAQItem: React.FC<{
  index: number;
  faqItem: FAQItem;
  onFaqHover: (index: number | null) => void;
}> = ({ index, faqItem: { question, answer }, onFaqHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      position={"relative"}
      display="flex"
      alignItems={"center"}
      justifyContent={"flex-start"}
      bgColor="gray.200"
      w="100%"
      maxW="1000px"
      h={"fit-content"}
      p={4}
      borderRadius={"lg"}
      onMouseEnter={() => {
        setIsHovered(true);
        onFaqHover(index);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onFaqHover(null);
      }}
      transition={"height 0.3s ease-in-out"}
    >
      <Box
        w={28}
        bgColor="gray.400"
        position="absolute"
        top={-1}
        left={isHovered ? "90%" : -1}
        // right={isHovered ? -1 : undefined}
        borderRadius="lg"
        h={16}
        transition={"left 0.3s ease-in-out"}
      ></Box>
      <Text
        fontWeight="bold"
        ml={isHovered ? 0 : 24}
        pl={2}
        pr={isHovered ? 28 : 0}
        transition={"all 0.3s ease-in-out"}
      >
        {isHovered ? answer : question}
      </Text>
    </Box>
  );
};
