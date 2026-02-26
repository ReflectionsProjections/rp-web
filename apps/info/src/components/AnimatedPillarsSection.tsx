import { Box, VStack, Image, Flex, Container } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import { useRef } from "react";
import AnimatedPillar from "./AnimatedPillar";

interface AnimatedPillarsSectionProps {
  icons: string[];
}

const MotionBox = motion(Box);
const MotionContainer = motion(Container);
const spotlightHeight = "975px";

export const AnimatedPillarsSection: React.FC<AnimatedPillarsSectionProps> = ({
  icons
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const shadowOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35, 0.65, 0.8],
    [0, 0.35, 0.35, 0]
  );

  const heightDiff = useTransform(scrollYProgress, [0.15, 0.85], [200, -750]);

  const translateY = useTransform(heightDiff, (h) => `translateY(${h}px)`);

  return (
    <Box
      pos="relative"
      zIndex={100}
      display={{ base: "none", md: "block" }}
      ref={containerRef}
    >
      {/* portal */}
      {createPortal(
        <Box
          pos="fixed"
          w="100vw"
          h="100vh"
          zIndex={50}
          top="0"
          data-label="pillars-overlay"
          pointerEvents="none"
          display={{ base: "none", md: "block" }}
        >
          <MotionBox
            style={{
              willChange: "opacity",
              opacity: shadowOpacity
            }}
            bg="black"
            w="100%"
            h="100%"
          >
            <MotionContainer
              data-label="pillars-spotlights"
              maxW="container.xl"
              position="absolute"
              zIndex={3}
              left="0"
              right="0"
              mx="auto"
              style={{
                transform: translateY,
                willChange: "transform",
                maskImage:
                  "linear-gradient(transparent 1%, black 25%, black 70%, transparent 100%)"
              }}
            >
              <Flex // spotlights
                direction="row"
                justify="space-between"
                height="100%"
                width="100%"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <VStack
                    key={index}
                    spacing={1}
                    width="20%"
                    filter="blur(10px)"
                  >
                    <MotionBox
                      w="200px"
                      h={spotlightHeight}
                      bg="rgb(250, 230, 170)"
                      pos="relative"
                      zIndex={1}
                      clipPath="polygon(25% 0, 75% 0, 95% 100%, 5% 100%)"
                    />
                  </VStack>
                ))}
              </Flex>
            </MotionContainer>
          </MotionBox>
        </Box>,
        document.body
      )}

      {/* pillars */}
      <Flex
        direction="row"
        justify="space-between"
        top="-15px"
        display={{ base: "none", md: "flex" }}
        pos="relative"
        zIndex={3}
        paddingTop="100px"
        height="500px"
        sx={{
          maskImage: "linear-gradient(black 30%, transparent 100%)"
        }}
      >
        {icons.map((icon, index) => {
          const baseHeights = [-55, 25, -5, 45, -35];
          return (
            <VStack key={index} spacing={1} width="20%">
              <AnimatedPillar
                baseHeight={baseHeights[index]}
                heightDelta={300}
                time={2}
              >
                <Image
                  src={icon}
                  w="75px"
                  h="75px"
                  filter="drop-shadow(5px 20px 10px gray)"
                />
              </AnimatedPillar>
            </VStack>
          );
        })}
      </Flex>
    </Box>
  );
};
