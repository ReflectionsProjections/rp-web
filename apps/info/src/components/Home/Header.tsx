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
    base: "md",
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
        <Box
          py={{ base: 8, md: 16 }}
          w="100%"
          justifyContent="center"
          minH={{ base: "100vh", md: "100vh" }}
          bgImage="url('/TOP.svg')"
          bgSize="cover"
          bgPosition="center bottom"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          alignItems="center"
        >
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={{ base: 3, md: 30 }}
            px={{ base: 4, md: 0 }}
            flexWrap={{ base: "nowrap", md: "nowrap" }}
            position="relative"
            zIndex={2}
          >
            <Heading
              size={headingSize}
              fontFamily="mono"
              color="white"
              textAlign="center"
              textShadow="2px 2px 4px rgba(0,0,0,0.7)"
            >
              REFLECTIONS
            </Heading>
            <Box
              w={1}
              h={{ base: 50, md: 100 }}
              bgColor="rgba(255,255,255,0.8)"
            />
            <Heading
              size={headingSize}
              fontFamily="mono"
              color="white"
              textAlign="center"
              textShadow="2px 2px 4px rgba(0,0,0,0.7)"
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
        minH={{ base: "105vh", md: "105vh" }}
        bgImage="url('/TOP.svg')"
        bgSize="cover"
        bgPosition="center bottom"
        bgRepeat="no-repeat"
        position="relative"
        display="flex"
        alignItems="center"
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
          position="relative"
          zIndex={2}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <MotionHeading
            size={headingSize}
            fontFamily="mono"
            color="white"
            textAlign="center"
            textShadow="2px 2px 4px rgba(0,0,0,0.7)"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              color: "rgba(255,255,255,0.9)",
              transition: { duration: 0.2 }
            }}
          >
            REFLECTIONS
          </MotionHeading>

          <MotionBox
            w={1}
            h={{ base: 50, md: 100 }}
            bgColor="rgba(255,255,255,0.8)"
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
            color="white"
            textAlign="center"
            textShadow="2px 2px 4px rgba(0,0,0,0.7)"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              color: "rgba(255,255,255,0.9)",
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
