import { Box, Flex, Heading, useBreakpointValue } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);

export const Header = () => {
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Use responsive font sizes based on screen size
  const headingSize = useBreakpointValue({
    base: "lg",
    sm: "xl",
    md: "2xl",
    lg: "3xl"
  });

  // Scroll-based animations
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.8, 0.3]);
  const dividerScale = useTransform(scrollY, [0, 200], [1, 0.5]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section data-label="header">
        <Box py={{ base: 8, md: 16 }} w="100%" justifyContent="center">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={{ base: 3, md: 30 }}
            px={{ base: 4, md: 0 }}
            flexWrap={{ base: "nowrap", md: "nowrap" }}
          >
            <Heading
              size={headingSize}
              fontFamily="mono"
              color="gray.900"
              textAlign="center"
            >
              REFLECTIONS
            </Heading>
            <Box w={1} h={{ base: 50, md: 100 }} bgColor="gray.500" />
            <Heading
              size={headingSize}
              fontFamily="mono"
              color="gray.900"
              textAlign="center"
            >
              PROJECTIONS
            </Heading>
          </Flex>
        </Box>
      </section>
    );
  }

  return (
    <section data-label="header">
      <MotionBox
        py={{ base: 8, md: 16 }}
        w="100%"
        justifyContent="center"
        style={{
          y: headerY,
          opacity: headerOpacity,
          willChange: "transform, opacity"
        }}
      >
        <MotionFlex
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={{ base: 3, md: 30 }}
          px={{ base: 4, md: 0 }}
          flexWrap={{ base: "nowrap", md: "nowrap" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <MotionHeading
            size={headingSize}
            fontFamily="mono"
            color="gray.900"
            textAlign="center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              color: "gray.700",
              transition: { duration: 0.2 }
            }}
          >
            REFLECTIONS
          </MotionHeading>

          <MotionBox
            w={1}
            h={{ base: 50, md: 100 }}
            bgColor="gray.500"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            style={{
              scaleY: dividerScale,
              willChange: "transform"
            }}
            transformOrigin="center"
          />

          <MotionHeading
            size={headingSize}
            fontFamily="mono"
            color="gray.900"
            textAlign="center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              color: "gray.700",
              transition: { duration: 0.2 }
            }}
          >
            PROJECTIONS
          </MotionHeading>
        </MotionFlex>
      </MotionBox>
    </section>
  );
};
