import { FAQItem, FAQS } from "@/constants/faq";
import { Box, Collapse, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Car1 from "../../assets/car1.svg";
import Car2 from "../../assets/car2.svg";
import Car3 from "../../assets/car3.svg";
import Car4 from "../../assets/car4.svg";
import Car5 from "../../assets/car5.svg";

import FAQHeaderLeftBars from "../../assets/faq-header-left-bars.svg";
import FAQHeaderRightBars from "../../assets/faq-header-right-bars.svg";
import FAQBackdrop from "../../assets/faq-backdrop.png";

const cars = [Car1, Car2, Car3, Car4, Car5];

export const FAQHeader: React.FC<{
  selectedFaqIndices: Set<number>;
}> = ({ selectedFaqIndices }) => {
  return (
    <Box position="relative" w="100%" overflow="hidden">
      {/* Left bar (background) */}
      <Image
        src={FAQHeaderLeftBars}
        position="absolute"
        top={{ base: 0, md: -5 }}
        left={{ base: -0, md: 0 }}
        h={{ base: "50px", sm: "75px", md: "140px" }}
        opacity={0.9}
        zIndex={0}
      />

      {/* Right bar (background) */}
      <Image
        src={FAQHeaderRightBars}
        position="absolute"
        top={{ base: 0, md: -0 }}
        right={{ base: -10, sm: -14, md: -90 }}
        h={{ base: "50px", sm: "75px", md: "140px" }}
        opacity={0.9}
        zIndex={0}
      />

      {/* Foreground content */}
      <HStack
        w="100%"
        p={2}
        pt={0}
        alignItems="flex-start"
        justifyContent="center"
        position="relative"
        zIndex={1}
      >
        {/* Center column */}
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
        base: "100vh", // To keep the background consistent on mobile
        md: "70dvh"
      }}
      justifyContent="flex-start"
      bgImage={FAQBackdrop}
      bgColor={"black"}
      bgSize="cover"
      bgPosition="center" // ← anchor the image at its top
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

type StopLightProps = {
  active: boolean;
  hasBar?: boolean;
};

export const StopLight: React.FC<StopLightProps> = ({ active, hasBar }) => {
  return (
    <HStack gap={0}>
      {/* Housing */}
      <Box
        // 100% scale on md+, 0.75× on base
        w={{ base: "36px", md: "48px" }}
        px={{ base: 1, md: 2 }}
        py={{ base: 2, md: 3 }}
        bgGradient="linear(to-b, rgb(50,50,50), rgb(40,40,40))"
        borderRadius="md"
        boxShadow="0 4px 8px rgba(0,0,0,0.6)"
      >
        <VStack spacing={{ base: 2, md: 3 }}>
          {/* Red/Green Lamps */}
          <Box
            w={{ base: "16px", md: "24px" }}
            h={{ base: "16px", md: "24px" }}
            borderRadius="full"
            bg={active ? "green.300" : "red.500"}
            boxShadow="inset 0 0 4px rgba(0,0,0,0.7)"
            transition="all 0.2s ease-in-out"
          />
          <Box
            w={{ base: "16px", md: "24px" }}
            h={{ base: "16px", md: "24px" }}
            borderRadius="full"
            bg={active ? "green.300" : "red.500"}
            boxShadow="inset 0 0 4px rgba(0,0,0,0.7)"
            transition="all 0.2s ease-in-out"
          />
        </VStack>
      </Box>

      {/* Optional side bar */}
      {hasBar && (
        <VStack
          gap={{ base: 1, md: 2 }}
          mb={{ base: "30%", md: "40%" }}
          align="start"
        >
          <Box
            w={{ base: "14px", md: "20px" }}
            h={{ base: "4px", md: "5px" }}
            bg="gray.600"
          />
          <Box
            w={{ base: "14px", md: "20px" }}
            h={{ base: "4px", md: "5px" }}
            bg="gray.500"
          />
        </VStack>
      )}
    </HStack>
  );
};

type FAQQuestionProps = {
  index: number;
  faqItem: FAQItem;
  onFaqToggle: (index: number) => void;
};

const FAQQuestion: React.FC<FAQQuestionProps> = ({
  index,
  faqItem: { question, answer, colors },
  onFaqToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onFaqToggle(index);
  };

  return (
    <Box w="80%">
      <Box
        position={"relative"}
        display="flex"
        alignItems={{ md: "center" }}
        justifyContent={"flex-start"}
        bgColor={colors.light}
        p={4}
        py={5}
        pt={{ base: 3, md: 4 }}
        pb={{ base: 10, md: 5 }}
        borderRadius={"lg"}
        borderBottomRadius={isOpen ? 0 : "lg"}
        transition={"all 0.3s ease-in-out"}
        onClick={handleToggle}
        cursor="pointer"
      >
        {/* shaded wedge */}
        <Box
          position="absolute"
          right="0"
          top="0"
          bottom="0"
          w={{ base: "42%", md: "35%" }}
          bgColor={colors.dark}
          // create the angled edge
          sx={{ clipPath: "polygon(28% 0, 100% 0, 100% 100%, 0 100%)" }}
          borderTopRightRadius="lg"
          borderBottomRightRadius={isOpen ? 0 : "lg"}
          pointerEvents="none"
          zIndex={0}
        />

        <Image
          position="absolute"
          left={{
            base: isOpen ? "62%" : -1,
            sm: isOpen ? "70%" : -3,
            md: isOpen ? "72%" : "-20%"
          }}
          bottom={{ base: 0, md: undefined }}
          borderRadius="lg"
          h={{ base: "30px", md: "70px" }}
          transition={"left 0.3s ease-in-out"}
          src={cars[index % cars.length]}
          alt="Car"
          objectFit="cover"
          transform={{ md: "scale(0.8)" }}
          zIndex={2}
        />

        <Text
          ml={{ md: isOpen ? 0 : "130px" }}
          mr={{ md: isOpen ? 28 : 0 }}
          pl={{ base: 1, md: 2 }}
          color="white"
          maxH="100%"
          overflow="hidden"
          fontFamily="ProRacing"
          fontSize="2xl"
          zIndex={1}
          transition="all 0.3s ease-in-out"
        >
          {question}
        </Text>
      </Box>

      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Box bg="gray.50" p={4} borderBottomRadius="lg">
          <Text
            fontFamily={"Magistral"}
            fontWeight={"medium"}
            color="gray.800"
            fontSize={"lg"}
          >
            {answer}
          </Text>
        </Box>
      </Collapse>
    </Box>
  );
};
