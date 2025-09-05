import { Box, SimpleGrid, Image, Link } from "@chakra-ui/react";
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

const PitStopSceneWrapper: React.FC = () => {
  const getGlowFilter = (color: string) => {
    return `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 25px ${color}88) drop-shadow(0 0 35px ${color}44)`;
  };

  const getSubtleGlowFilter = (color: string) => {
    return `drop-shadow(0 0 8px ${color}AA) drop-shadow(0 0 25px ${color}88) drop-shadow(0 0 35px ${color}66)`;
  };

  const sponsorGlows = {
    hrt: "#ff6600", // Orange for HRT
    cat: "#ffdd00", // Yellow for Caterpillar
    qual: "#0066cc", // Blue for Qualcomm
    aech: "#808080" // Gray for Aechelon
  };

  return (
    <Box
      as="section"
      w="100%"
      pos="relative"
      mx="auto"
      minH="fit-content"
      overflow="hidden"
    >
      {/* Desktop + Tablet Version - Animated PitStop Scene */}
      <Box
        display={{ base: "none", md: "block" }}
        w="100%"
        minH="110vh"
        bgColor="#100E0E"
        pos="relative"
      >
        <Box
          pos="relative"
          w="100%"
          h="110vh"
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
              w="1100px"
              h="auto"
              animation={`${slideInUp} 1s ease-out`}
              css={{ animationDelay: "0.5s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "translate(-50%, -50%) scale(1.05)",
                filter:
                  "brightness(1.2) drop-shadow(0 0 30px rgba(255,0,0,0.5))",
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={2}
            />
            <Image
              src="/sponsors/car_new/hrt.png"
              pos="absolute"
              top="2%"
              left="48%"
              display="block"
              w="300px"
              h="auto"
              animation={`${slideInLeft} 1.2s ease-out`}
              css={{ animationDelay: "0.2s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.5) translateX(-15px)",
                filter: getGlowFilter(sponsorGlows.hrt),
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={3}
            />
            <Image
              src="/sponsors/car_new/cat.png"
              pos="absolute"
              top="10%"
              left="20%"
              display="block"
              w="300px"
              h="auto"
              animation={`${slideInLeft} 1.6s ease-out`}
              css={{ animationDelay: "0.4s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.5) translate(15px, 10px)",
                filter: getGlowFilter(sponsorGlows.cat),
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={3}
            />
            <Image
              src="/sponsors/car_new/qual.png"
              pos="absolute"
              top="60%"
              left="18%"
              display="block"
              w="330px"
              h="auto"
              animation={`${slideInRight} 1.8s ease-out`}
              css={{ animationDelay: "0.5s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.5) translate(15px, -15px)",
                filter: getGlowFilter(sponsorGlows.qual),
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={3}
            />
            <Image
              src="/sponsors/car_new/aech.png"
              pos="absolute"
              bottom="10%"
              left="49%"
              transform="translateX(-50%)"
              display="block"
              w="300px"
              h="auto"
              animation={`${slideInDown} 2s ease-out`}
              css={{ animationDelay: "0.6s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "translateX(-50%) scale(1.5) translateY(-15px)",
                filter: getGlowFilter(sponsorGlows.aech),
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={3}
            />
          </Box>
          <AnimatedHeader>Sponsors</AnimatedHeader>
        </Box>
      </Box>

      {/* Tablet Version - COMMENTED OUT */}
      {/* 
      <Box
        display={{ base: "none", md: "block", xl: "none" }}
        pos="relative"
        w="100%"
        maxW="1000px"
        mx="auto"
        minH="100vh"
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
          opacity={0.2}
          zIndex={1}
        >
          <Image
            src="/sponsors/car/8.png"
            pos="absolute"
            left="50%"
            display="block"
            w="900px"
            h="auto"
            animation={`${slideInUp} 1s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
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
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="-20%"
            left="20%"
            display="block"
            w="400px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="15%"
            left="25%"
            display="block"
            w="350px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="-15%"
            right="-65%"
            display="block"
            w="350px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
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
          />
        </Box>

        <Box
          pos="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          maxW="700px"
          zIndex={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
        >
          <SimpleGrid columns={2} spacing={{ base: 8, md: 12 }} p={8}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInLeft} 1.2s ease-out`}
              css={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <Link href="https://www.caterpillar.com" isExternal>
                <Image
                  src="/sponsors/car_images/caterpillar.svg"
                  h={{ md: "120px" }}
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.cat)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.cat),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInRight} 1.2s ease-out`}
              css={{ animationDelay: "1.2s", animationFillMode: "both" }}
            >
              <Link href="https://www.hudsonrivertrading.com/" isExternal>
                <Image
                  src="/sponsors/car_images/hrt.svg"
                  h={{ md: "100px" }}
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.hrt)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.hrt),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInLeft} 1.2s ease-out`}
              css={{ animationDelay: "1.4s", animationFillMode: "both" }}
            >
              <Link href="https://www.qualcomm.com/" isExternal>
                <Image
                  src="/sponsors/car_images/qualcomm.png"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.qual)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.qual),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInRight} 1.2s ease-out`}
              css={{ animationDelay: "1.6s", animationFillMode: "both" }}
            >
              <Link href="https://www.aechelon.com" isExternal>
                <Image
                  src="/sponsors/car_images/aechelon.png"
                  h={{ md: "150px" }}
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.aech)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.aech),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
          </SimpleGrid>
        </Box>

        <AnimatedHeader>Sponsors</AnimatedHeader>
      </Box>
      */}

      {/* Mobile Version */}
      <Box
        display={{ base: "block", md: "none" }}
        pos="relative"
        w="100%"
        minW="390px"
        minH="100vh"
        maxH={{ base: "1000px", md: "1300px" }}
        overflow="hidden"
        bg="#100E0E"
      >
        {/* Background Car Scene with Low Opacity */}
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
          opacity={0.15}
          zIndex={1}
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
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="15%"
            right="-25%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out`}
            css={{ animationDelay: "0.5s", animationFillMode: "both" }}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="20%"
            left="-20%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out`}
            css={{ animationDelay: "0.2s", animationFillMode: "both" }}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="-15%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out`}
            css={{ animationDelay: "0.4s", animationFillMode: "both" }}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="20%"
            right="-15%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out`}
            css={{ animationDelay: "0.3s", animationFillMode: "both" }}
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
          />
        </Box>

        {/* Sponsor Overlay Grid */}
        <Box
          pos="absolute"
          top="55%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="100%"
          maxW="350px"
          zIndex={5}
          px={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
        >
          <SimpleGrid columns={1} spacing={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out`}
              css={{ animationDelay: "1s", animationFillMode: "both" }}
            >
              <Link href="https://www.caterpillar.com" isExternal>
                <Image
                  src="/sponsors/car_images/caterpillar.svg"
                  h="100px"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.cat)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.cat),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out`}
              css={{ animationDelay: "1.2s", animationFillMode: "both" }}
            >
              <Link href="https://www.hudsonrivertrading.com/" isExternal>
                <Image
                  src="/sponsors/car_images/hrt.svg"
                  h="100px"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.hrt)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.hrt),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out`}
              css={{ animationDelay: "1.4s", animationFillMode: "both" }}
            >
              <Link href="https://www.qualcomm.com/" isExternal>
                <Image
                  src="/sponsors/car_images/qualcomm.png"
                  h="60px"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.qual)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.qual),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out`}
              css={{ animationDelay: "1.6s", animationFillMode: "both" }}
            >
              <Link href="https://www.aechelon.com" isExternal>
                <Image
                  src="/sponsors/car_images/aechelon.png"
                  h="130px"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.aech)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.aech),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>
          </SimpleGrid>
        </Box>

        <AnimatedHeader>Sponsors</AnimatedHeader>
      </Box>
    </Box>
  );
};

export default PitStopSceneWrapper;
