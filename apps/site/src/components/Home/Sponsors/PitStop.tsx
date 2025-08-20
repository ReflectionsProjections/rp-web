import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { AnimatedHeader } from "../shared/AnimatedHeader";

const slideInLeft = keyframes`
from { transform: translateX(-100px); opacity: 0; }
to { transform: translateX( 0px); opacity: 1; }
`;

const slideInRight = keyframes`
from { transform: translateX( 100px); opacity: 0; }
to { transform: translateX( 0px); opacity: 1; }
`;

const slideInUp = keyframes`
from { transform: translateY( 50px); opacity: 0; }
to { transform: translateY( 0px); opacity: 1; }
`;

const slideInDown = keyframes`
from { transform: translateY(-50px); opacity: 0; }
to { transform: translateY( 0px); opacity: 1; }
`;

const PitStopScene: React.FC = () => {
  return (
    <Box as="section" w="100%" minH="100vh" bgColor="#100E0E" pos="relative">
      {/* Desktop View */}
      <Box
        display={{ base: "none", xl: "block" }}
        pos="relative"
        w="100%"
        h="100vh"
        overflow="hidden"
        bgColor="#100E0E"
      >
        <Box
          pos="absolute"
          top="55%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
        >
          <Image
            src="/sponsors/car/7.png"
            pos="absolute"
            top="10%"
            left="10%"
            transform="translate(-50%, -50%)"
            display="block"
            w="1300px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translate(-50%, -50%) scale(1.05)",
              filter: "brightness(1.2) drop-shadow(0 0 30px rgba(255,0,0,0.5))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={2}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            top="10%"
            left="48%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.5) translateX(-15px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="8%"
            right="10%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.5) translate(-15px, -10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="20%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.5) translate(15px, 10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="55%"
            left="30%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.5) translate(15px, -15px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/6.png"
            pos="absolute"
            bottom="10%"
            left="50%"
            transform="translateX(-50%)"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInDown} 2s ease-out`}
            css={{ animationDelay: "0.6s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateX(-50%) scale(1.5) translateY(-15px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer",
              outline: "none"
            }}
            _focus={{ outline: "none" }}
            zIndex={3}
          />
        </Box>
        <AnimatedHeader>Sponsors</AnimatedHeader>
        <Box
          pos={"absolute"}
          bottom={0}
          left={0}
          w="100%"
          h="15px"
          bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
          zIndex={1}
        />
      </Box>

      {/* Tablet View */}
      <Box
        display={{ base: "none", md: "block", xl: "none" }}
        pos="relative"
        w="100%"
        h="100vh"
        overflow="hidden"
        bg="#100E0E"
      >
        <Box
          pos="absolute"
          top="50%"
          left="50%"
          transform={{
            base: "translate(-50%, -50%) scale(0.5)",
            lg: "translate(-50%, -50%) scale(0.65)"
          }}
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
        >
          <Image
            src="/sponsors/car/8.png"
            pos="absolute"
            transform="translate(-50%, -50%)"
            display="block"
            w="1300px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translate(-50%, -50%) scale(1.05)",
              filter: "brightness(1.2) drop-shadow(0 0 30px rgba(255,0,0,0.5))",
              cursor: "pointer"
            }}
            zIndex={2}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="15%"
            right="2%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(10px, -10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="-12%"
            left="10%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translateX(-10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="3%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(10px, 8px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="8%"
            right="10%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(-10px, -8px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />

          <Image
            src="/sponsors/car/6.png"
            pos="absolute"
            top="40%"
            right="10%"
            transform="translateX(-50%)"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInDown} 2s ease-out`}
            css={{ animationDelay: "0.6s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateX(-50%) scale(1.4) translateY(-10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
        </Box>
        <AnimatedHeader>Sponsors</AnimatedHeader>
        <Box
          pos="absolute"
          bottom={0}
          left={0}
          w="100%"
          h="12px"
          bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
          zIndex={1}
        />
      </Box>

      {/* Mobile View */}
      <Box
        display={{ base: "block", md: "none" }}
        pos="relative"
        w="100%"
        h="100vh"
        overflow="hidden"
        bg="#100E0E"
      >
        <Box
          pos="absolute"
          top="50%"
          left="50%"
          transform={{
            base: "translate(-50%, -50%) scale(0.35)",
            sm: "translate(-50%, -50%) scale(0.45)"
          }}
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
        >
          <Image
            src="/sponsors/car/8.png"
            pos="absolute"
            top="10%"
            left="10%"
            transform="translate(-50%, -50%)"
            display="block"
            w="1300px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translate(-50%, -50%) scale(1.02)",
              filter: "brightness(1.2) drop-shadow(0 0 20px rgba(255,0,0,0.5))",
              cursor: "pointer"
            }}
            zIndex={2}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="15%"
            right="2%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(10px, -10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="2%"
            left="10%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translateX(-10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="3%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(10px, 8px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="8%"
            right="10%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.4) translate(-10px, -8px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />

          <Image
            src="/sponsors/car/6.png"
            pos="absolute"
            top="40%"
            right="-20%"
            transform="translateX(-50%)"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInDown} 2s ease-out`}
            css={{ animationDelay: "0.6s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateX(-50%) scale(1.4) translateY(-10px)",
              filter: "drop-shadow(0 0 20px rgba(255,0,0,0.8))",
              cursor: "pointer"
            }}
            zIndex={3}
          />
        </Box>
        <AnimatedHeader>Sponsors</AnimatedHeader>
        <Box
          pos="absolute"
          bottom={0}
          left={0}
          w="100%"
          h="10px"
          bg="linear-gradient(90deg, #ff0000 0%, #ffffff 50%, #ff0000 100%)"
          zIndex={1}
        />
      </Box>
    </Box>
  );
};

export default PitStopScene;
