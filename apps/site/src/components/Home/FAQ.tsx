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
          {faqs.map((_, index) => {
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
        {faqs.map((faqItem, index) => (
          <FAQItem
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

const StopLight: React.FC<{
  active: boolean;
}> = ({ active }) => {
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

const FAQItem: React.FC<{
  index: number;
  faqItem: FAQItem;
  onFaqToggle: (index: number) => void;
}> = ({ index, faqItem: { question, answer }, onFaqToggle }) => {
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
      {/* <Box
        display={isOpen ? "block" : "none"}
        backgroundColor="gray.50"
        transition="300ms"
        p={4}
        borderBottomRadius={"lg"}
      >
        <Text>
          {isOpen && answer}
        </Text>
      </Box> */}
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Box bg="gray.50" p={4} borderBottomRadius="lg">
          <Text>{answer}</Text>
        </Box>
      </Collapse>
    </Box>
  );
};
