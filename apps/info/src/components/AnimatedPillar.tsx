import { Box } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion(Box);

type AnimatedCounterProps = {
  // icon?: string;
  baseHeight: number;
  heightDelta: number;
  time: number;
  children: React.ReactNode;
};

const AnimatedPillar: React.FC<AnimatedCounterProps> = ({
  baseHeight,
  heightDelta,
  time,
  children
}) => {
  const viewMarkerRef = useRef(null);
  const isInView = useInView(viewMarkerRef);

  return (
    <Box ref={viewMarkerRef}>
      <MotionBox
        initial={{ opacity: 0, y: heightDelta }}
        animate={isInView ? { opacity: 1, y: baseHeight } : {}}
        transition={{ duration: time, ease: "easeOut" }}
        zIndex={3}
        w="120px"
        h="350px"
        borderBottom="1px solid black"
      >
        {/* pillar */}
        <Box
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          pos="relative"
          bottom="5px"
          zIndex={5}
        >
          {children}
        </Box>
        <Box
          sx={{ transform: "rotateX(60deg)" }}
          pos="relative"
          bottom="15px"
          zIndex={4}
          w="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            w="84.9px"
            h="84.9px"
            bg="rgba(234, 234, 234, 1)"
            pos="absolute"
            sx={{ transform: "rotateZ(45deg)" }}
          />
        </Box>
        <Box
          w="60px"
          h="500px"
          bg="rgba(86, 84, 87, 1)"
          pos="absolute"
          zIndex={3}
          mr="60px"
          sx={{ transform: "skewY(25deg)" }}
        />
        <Box
          w="60px"
          h="500px"
          bg="rgba(217, 217, 217, 1)"
          pos="absolute"
          zIndex={2}
          ml="60px"
          sx={{ transform: "skewY(-25deg)" }}
        />
      </MotionBox>
    </Box>
  );
};

export default AnimatedPillar;
