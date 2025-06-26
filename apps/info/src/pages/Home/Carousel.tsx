// interface CarouselItem {
//   title: string;
//   image: string;
// }

// interface CircularCarouselProps {
//   items: CarouselItem[];
// }

import { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Image,
  Text,
  Button,
  useBreakpointValue
} from "@chakra-ui/react";

const CircularCarousel = () => {
  const items = [
    { title: "RP 2025 Site", image: "/images/rp2025site.png" },
    { title: "RP 2025 Site 2", image: "/images/rp2025site.png" },
    { title: "RP 2025 Site 3", image: "/images/rp2025site.png" }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

  const defaultConfig = {
    containerHeight: "500px",
    headingSize: "3xl",
    headingMb: 6,
    horizontalRadius: 120,
    verticalRadius: 80,
    itemWidth: "250px",
    itemHeight: "180px",
    itemMarginLeft: "-90px",
    itemMarginTop: "-60px",
    ellipseWidth: "260px",
    ellipseHeight: "180px",
    buttonSpacing: 4,
    buttonSize: "md",
    buttonPx: 6,
    navMt: 8,
    fontSize: "16px"
  };

  const desktopConfig = {
    containerHeight: "700px",
    headingSize: "5xl",
    headingMb: 10,
    horizontalRadius: 300,
    verticalRadius: 180,
    itemWidth: "300px",
    itemHeight: "200px",
    itemMarginLeft: "-140px",
    itemMarginTop: "-90px",
    ellipseWidth: "620px",
    ellipseHeight: "380px",
    buttonSpacing: 6,
    buttonSize: "lg",
    buttonPx: 8,
    navMt: 40,
    fontSize: "22px"
  };

  const config =
    useBreakpointValue({
      base: defaultConfig,
      md: desktopConfig
    }) ?? defaultConfig;

  const handleItemClick = (index: number) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);

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

  const handleNavClick = (direction: string) => {
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

    const x = config.horizontalRadius * Math.sin(radians);
    const y = config.verticalRadius * Math.cos(radians);
    const zIndex = Math.round(50 - y / 10);

    const scale =
      0.8 + ((y + config.verticalRadius) / (config.verticalRadius * 2)) * 0.3;
    const isFrontItem = index === activeIndex;

    return {
      transform: `translate(${x}px, ${y}px) scale(${scale})`,
      zIndex,
      opacity:
        0.8 + ((y + config.verticalRadius) / (config.verticalRadius * 2)) * 0.4,
      boxShadow: isFrontItem
        ? "0 10px 30px rgba(0,0,0,0.4)"
        : "0 5px 15px rgba(0,0,0,0.2)"
    };
  };

  if (isMobile) {
    return (
      <Flex direction="column" align="center" w="100%" px={4} py={6}>
        <Heading
          fontSize={config.headingSize}
          mb={config.headingMb}
          textAlign="center"
        >
          Meet the Team
        </Heading>

        <Box position="relative" w="100%" maxW="400px" mb={6}>
          <Image
            src={items[activeIndex].image}
            alt={items[activeIndex].title}
            w="100%"
            h="250px"
            objectFit="cover"
            borderRadius="16px"
            boxShadow="0 10px 30px rgba(0,0,0,0.4)"
          />
          <Text
            position="absolute"
            bottom="16px"
            left="16px"
            color="white"
            fontSize={config.fontSize}
            fontWeight="bold"
            textShadow="0 2px 4px rgba(0,0,0,0.5)"
          >
            {items[activeIndex].title}
          </Text>
        </Box>

        <Flex justifyContent="center" gap={2} mb={6}>
          {items.map((_, index) => (
            <Box
              key={index}
              w="12px"
              h="12px"
              borderRadius="50%"
              bg={index === activeIndex ? "blue.500" : "gray.300"}
              cursor="pointer"
              onClick={() => handleItemClick(index)}
              transition="all 0.3s"
            />
          ))}
        </Flex>

        <Flex justifyContent="center" gap={config.buttonSpacing}>
          <Button
            onClick={() => handleNavClick("prev")}
            colorScheme="blue"
            size={config.buttonSize}
            px={config.buttonPx}
            isDisabled={isAnimating}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            Previous
          </Button>
          <Button
            onClick={() => handleNavClick("next")}
            colorScheme="blue"
            size={config.buttonSize}
            px={config.buttonPx}
            isDisabled={isAnimating}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            Next
          </Button>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      position="relative"
      w="100%"
      h={config.containerHeight}
      pt={8}
    >
      <Heading fontSize={config.headingSize} mb={config.headingMb}>
        Meet the Team
      </Heading>
      <Box position="relative" w="100%" h="500px" mx="auto">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w={config.ellipseWidth}
          h={config.ellipseHeight}
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
            w={config.itemWidth}
            h={config.itemHeight}
            ml={config.itemMarginLeft}
            mt={config.itemMarginTop}
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
              fontSize={config.fontSize}
              fontWeight="bold"
              textShadow="0 2px 4px rgba(0,0,0,0.5)"
            >
              {item.title}
            </Text>
          </Box>
        ))}
      </Box>

      <Flex justifyContent="center" mt={config.navMt} mb={10}>
        <Button
          onClick={() => handleNavClick("prev")}
          colorScheme="blue"
          size={config.buttonSize}
          mr={config.buttonSpacing}
          px={config.buttonPx}
          isDisabled={isAnimating}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Previous
        </Button>
        <Button
          onClick={() => handleNavClick("next")}
          colorScheme="blue"
          size={config.buttonSize}
          px={config.buttonPx}
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
