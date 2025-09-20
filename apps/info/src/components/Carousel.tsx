import React, { useState } from "react";
import { Box, Flex, Image, Text, Button } from "@chakra-ui/react";

interface CarouselItem {
  title: string;
  image: string;
}

interface CircularCarouselProps {
  items: CarouselItem[];
  centerItem?: CarouselItem;
}

const CircularCarousel: React.FC<CircularCarouselProps> = ({
  items,
  centerItem
}) => {
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

  const getItemStyle = (index: number, isMobile: boolean = false) => {
    const totalItems = items.length;
    const angleDegree = 360 / totalItems;
    const baseAngle = angleDegree * (index - activeIndex);
    const radians = (baseAngle * Math.PI) / 180;

    // Use fixed values that work well for the responsive design
    const horizontalRadius = isMobile ? 180 : 300;
    const verticalRadius = isMobile ? 120 : 180;

    const x = horizontalRadius * Math.sin(radians);
    const y = verticalRadius * Math.cos(radians);
    const zIndex = Math.round(50 - y / 10);

    const scale = 0.7 + ((y + verticalRadius) / (verticalRadius * 2)) * 0.25;
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
      h={{ base: "600px", md: "700px" }}
      pt={{ base: 4, md: 8 }}
    >
      <Box
        position="relative"
        w="100%"
        h={{ base: "400px", md: "500px" }}
        mx="auto"
      >
        {/* Responsive dashed border */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={{ base: "380px", md: "620px" }}
          h={{ base: "240px", md: "380px" }}
          borderRadius="50%"
          border="2px dashed"
          borderColor="gray.200"
          zIndex={0}
        />

        {/* Center Image */}
        {centerItem && (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            w={{ base: "120px", md: "160px" }}
            h={{ base: "80px", md: "100px" }}
            borderRadius="12px"
            overflow="hidden"
            boxShadow="0 8px 25px rgba(0,0,0,0.3)"
            zIndex={100}
            border="3px solid white"
          >
            <Image
              src={centerItem.image}
              alt={centerItem.title}
              w="100%"
              h="100%"
              objectFit="cover"
            />
            <Text
              position="absolute"
              bottom="8px"
              left="8px"
              color="white"
              fontSize={{ base: "10px", md: "12px" }}
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.7)"
            >
              {centerItem.title}
            </Text>
          </Box>
        )}

        {/* Mobile Carousel Items */}
        <Box display={{ base: "block", md: "none" }}>
          {items.map((item, index) => (
            <Box
              key={`mobile-${index}`}
              position="absolute"
              top="50%"
              left="50%"
              w="200px"
              h="120px"
              ml="-100px"
              mt="-60px"
              transition="all 0.5s ease-in-out"
              cursor="pointer"
              borderRadius="16px"
              overflow="hidden"
              boxShadow={getItemStyle(index, true).boxShadow}
              transform={getItemStyle(index, true).transform}
              zIndex={getItemStyle(index, true).zIndex}
              opacity={getItemStyle(index, true).opacity}
              _hover={{
                transform: `${
                  getItemStyle(index, true).transform.split(")")[0]
                }) scale(${
                  parseFloat(
                    getItemStyle(index, true).transform.split("scale(")[1]
                  ) + 0.05
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
                bottom="8px"
                left="8px"
                color="white"
                fontSize="14px"
                fontWeight="bold"
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
              >
                {item.title}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Desktop Carousel Items */}
        <Box display={{ base: "none", md: "block" }}>
          {items.map((item, index) => (
            <Box
              key={`desktop-${index}`}
              position="absolute"
              top="50%"
              left="50%"
              w="240px"
              h="140px"
              ml="-120px"
              mt="-70px"
              transition="all 0.5s ease-in-out"
              cursor="pointer"
              borderRadius="16px"
              overflow="hidden"
              boxShadow={getItemStyle(index, false).boxShadow}
              transform={getItemStyle(index, false).transform}
              zIndex={getItemStyle(index, false).zIndex}
              opacity={getItemStyle(index, false).opacity}
              _hover={{
                transform: `${
                  getItemStyle(index, false).transform.split(")")[0]
                }) scale(${
                  parseFloat(
                    getItemStyle(index, false).transform.split("scale(")[1]
                  ) + 0.05
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
                bottom="12px"
                left="12px"
                color="white"
                fontSize="18px"
                fontWeight="bold"
                textShadow="0 2px 4px rgba(0,0,0,0.5)"
              >
                {item.title}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Flex
        justifyContent="center"
        mt={{ base: 6, md: 12 }}
        gap={{ base: 4, md: 6 }}
        flexDirection={{ base: "column", sm: "row" }}
        w={{ base: "200px", sm: "auto" }}
      >
        <Button
          onClick={() => handleNavClick("prev")}
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          px={{ base: 6, md: 8 }}
          isDisabled={isAnimating}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleNavClick("next")}
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          px={{ base: 6, md: 8 }}
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
