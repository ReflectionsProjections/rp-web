import { FAQItem } from "@/constants/faq-questions";
import { Box, Collapse, Image, Text } from "@chakra-ui/react";
import { useState } from "react";

import Car1 from "../../../assets/car1.svg";
import Car2 from "../../../assets/car2.svg";
import Car3 from "../../../assets/car3.svg";
import Car4 from "../../../assets/car4.svg";
import Car5 from "../../../assets/car5.svg";

const CARS = [Car1, Car2, Car3, Car4, Car5];

type FAQQuestionProps = {
  index: number;
  faqItem: FAQItem;
  onFaqToggle: (index: number) => void;
};

export const FAQQuestion: React.FC<FAQQuestionProps> = ({
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
          src={CARS[index % CARS.length]}
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
