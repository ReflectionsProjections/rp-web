import { Box, Image } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

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
    <Box
      as="section"
      w="100%"
      maxW="1500px"
      pos="relative"
      mx="auto"
      pointerEvents={"none"}
      opacity={0.5}
      filter="blur(3px)"
    >
      {/* Desktop View */}
      <Box
        display={{ base: "none", lg: "block" }}
        pos="relative"
        w="100%"
        h="90vh"
        minH="1200px"
        mt={20}
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
            left="5%"
            display="block"
            w={{ lg: "1000px", xl: "1300px" }}
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={2}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            top="2%"
            left="60%"
            display="block"
            w={{ lg: "220px", xl: "300px" }}
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom={{ lg: "38%", xl: "27%" }}
            right="10%"
            display="block"
            w={{ lg: "220px", xl: "300px" }}
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="5%"
            left="20%"
            display="block"
            w={{ lg: "200px", xl: "300px" }}
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
            src="/assets/car/5.png"
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
            bottom={{ lg: "37%", xl: "30%" }}
            left="20%"
            transform="translateX(-50%)"
            display="block"
            w={{ lg: "220px", xl: "300px" }}
            h="auto"
            animation={`${slideInDown} 2s ease-out`}
            css={{ animationDelay: "0.6s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
        </Box>
      </Box>
      <Box
        display={{ base: "none", md: "block", lg: "none" }}
        pos="relative"
        w="100%"
        maxW="1000px"
        mx="auto"
        h="130dvh"
        overflow="hidden"
        bg="#100E0E"
      >
        <Box
          pos="absolute"
          top="46%"
          left="20%"
          transform={{
            base: "translate(-50%, -50%) scale(0.65)"
          }}
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
        >
          <Image
            src="/sponsors/car/8.png"
            pos="absolute"
            left="45%"
            display="block"
            w="900px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={2}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="13%"
            right="-65%"
            display="block"
            w="450px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="15%"
            left="20%"
            display="block"
            w="400px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="15%"
            left="20%"
            display="block"
            w="350px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="15%"
            right="-65%"
            display="block"
            w="350px"
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
            src="/assets/car/6.png"
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
        minW="390px"
        h="100vh"
        maxH={{ base: "1000px", md: "1300px" }}
        overflow="hidden"
        bg="#100E0E"
      >
        <Box
          pos="absolute"
          top="46%"
          left="50%"
          transform={{
            base: "translate(-50%, -50%) scale(0.7)"
          }}
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
        >
          <Image
            src="/sponsors/car/8.png"
            pos="absolute"
            top="0%"
            left="0%"
            transform="translate(-50%, -50%)"
            display="block"
            minW="400px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={2}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="15%"
            right="-35%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="2%"
            left="-40%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="-35%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
            transition="all 0.3s ease"
            zIndex={3}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="8%"
            right="-35%"
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
            src="/assets/car/6.png"
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
