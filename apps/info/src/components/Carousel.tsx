import React, { useState } from "react";
import { Box, Heading, Flex, Image, Text, Button } from "@chakra-ui/react";

interface CarouselItem {
  title: string;
  image: string;
}

interface CircularCarouselProps {
  items: CarouselItem[];
}

const CircularCarousel: React.FC<CircularCarouselProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleItemClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);

    // rotating shortest path
    const totalItems = items.length;
    const clockwiseSteps = (index - activeIndex + totalItems) % totalItems;
    const counterClockwiseSteps =
      (activeIndex - index + totalItems) % totalItems;

    const shouldGoClockwise = clockwiseSteps <= counterClockwiseSteps;
    const stepsToTake = shouldGoClockwise
      ? clockwiseSteps
      : counterClockwiseSteps;
    const direction = shouldGoClockwise ? 1 : -1;

    if (stepsToTake === 1) {
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
      return;
    }

    let currentStep = 0;

    const animateStep = () => {
      if (currentStep >= stepsToTake) {
        setIsAnimating(false);
        return;
      }

      setActiveIndex((prev) => (prev + direction + totalItems) % totalItems);
      currentStep++;

      setTimeout(animateStep, 300);
    };

    animateStep();
  };

  const handleNavClick = (direction: "prev" | "next") => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIndex =
      direction === "prev"
        ? (activeIndex - 1 + items.length) % items.length
        : (activeIndex + 1) % items.length;

    setActiveIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getItemStyle = (index: number) => {
    const totalItems = items.length;
    const angleDegree = 360 / totalItems;
    const baseAngle = angleDegree * (index - activeIndex);
    const radians = (baseAngle * Math.PI) / 180;

    const horizontalRadius = 300;
    const verticalRadius = 180;

    const x = horizontalRadius * Math.sin(radians);
    const y = verticalRadius * Math.cos(radians);
    const zIndex = Math.round(50 - y / 10);

    const scale = 0.8 + ((y + verticalRadius) / (verticalRadius * 2)) * 0.3;
    const isFrontItem = index === activeIndex;

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      zIndex,
      opacity: 0.8 + ((y + verticalRadius) / (verticalRadius * 2)) * 0.4,
      boxShadow: isFrontItem
        ? "0 10px 30px rgba(0,0,0,0.4)"
        : "0 5px 15px rgba(0,0,0,0.2)"
    };
  };

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      w="100%"
      h="700px"
      pt={8}
    >
      <Heading fontSize="5xl" mb={10}>
        Meet the Team
      </Heading>
      <Box position="relative" w="100%" h="500px" mx="auto">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="620px"
          h="380px"
          borderRadius="50%"
          border="2px dashed"
          borderColor="gray.200"
          zIndex={0}
        />

        {items.map((item, index) => (
          <Box
            key={index}
            position="absolute"
            top="50%"
            left="50%"
            w="280px"
            h="180px"
            ml="-140px"
            mt="-90px"
            transition="all 0.5s ease-in-out"
            cursor="pointer"
            borderRadius="16px"
            overflow="hidden"
            boxShadow={getItemStyle(index).boxShadow}
            transform={getItemStyle(index).transform}
            zIndex={getItemStyle(index).zIndex}
            opacity={getItemStyle(index).opacity}
            _hover={{
              transform: `${
                getItemStyle(index).transform.split(")")[0]
              }) scale(${
                parseFloat(getItemStyle(index).transform.split("scale(")[1]) +
                0.05
              })`,
              boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
            }}
            onClick={() => handleItemClick(index)}
          >
            <Image
              src={item.image}
              alt={item.title}
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Text
              position="absolute"
              bottom="16px"
              left="16px"
              color="white"
              fontSize="22px"
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.5)"
            >
              {item.title}
            </Text>
          </Box>
        ))}
      </Box>

      <Flex justifyContent="center" mt={12}>
        <Button
          onClick={() => handleNavClick("prev")}
          colorScheme="blue"
          size="lg"
          mr={6}
          px={8}
          isDisabled={isAnimating}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleNavClick("next")}
          colorScheme="blue"
          size="lg"
          px={8}
          isDisabled={isAnimating}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default CircularCarousel;
