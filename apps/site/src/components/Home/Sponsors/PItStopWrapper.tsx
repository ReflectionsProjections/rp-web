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

const PitStopSceneWrapper = () => {
  const getGlowFilter = (color: string) => {
    return `drop-shadow(0 0 15px ${color}) drop-shadow(0 0 25px ${color}88) drop-shadow(0 0 35px ${color}44)`;
  };

  const getSubtleGlowFilter = (color: string) => {
    return `drop-shadow(0 0 8px ${color}AA) drop-shadow(0 0 25px ${color}88) drop-shadow(0 0 35px ${color}66)`;
  };

  const sponsorGlows = {
    hrt: "#ff6600",
    cat: "#E4D00A",
    qual: "#0066cc",
    aech: "#808080",
    deere: "#3B8927"
  };

  return (
    <Box
      as="section"
      w="100%"
      pos="relative"
      mx="auto"
      minH="fit-content"
      overflow="hidden"
      backgroundImage="linear-gradient(to bottom, #100E0E, #1E1E1E)"
    >
      {/* Desktop Version */}
      <Box
        display={{ base: "none", xl: "flex" }}
        w="100%"
        // bgColor="#100E0E"
        pos="relative"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "100vh", // Base height
          "@media screen and (max-height: 800px)": {
            minHeight: "120vh" // Shorter desktop screens need more height
          },
          "@media screen and (min-height: 801px)": {
            minHeight: "100vh" // Taller desktop screens are fine with 100vh
          }
        }}
      >
        <Box
          pos="relative"
          w="100%"
          h="110vh"
          maxH="900px"
          maxW="1400px"
          overflow="hidden"
          // bgColor="#100E0E"
          minH="800px"
        >
          <Box
            pos="absolute"
            top="55%"
            left="55%"
            transform="translate(-50%, -50%)"
            w="100%"
            h="100%"
            transition="transform 0.5s ease"
          >
            <Image
              src="/sponsors/car/7.png"
              pos="absolute"
              top="15%"
              left="15%"
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
            <Link href="https://www.hudsonrivertrading.com/" isExternal>
              <Image
                src="/sponsors/car_new/hrt.png"
                pos="absolute"
                top="30%"
                left="2%"
                display="block"
                w="200px"
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
            </Link>
            <Link
              href="https://about.deere.com/en-us/our-company-and-purpose"
              isExternal
            >
              <Image
                src="/sponsors/car_new/deere.png"
                pos="absolute"
                top="8%"
                left="48%"
                display="block"
                w="300px"
                h="auto"
                animation={`${slideInLeft} 1.2s ease-out`}
                css={{ animationDelay: "0.2s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.5) translateX(-15px)",
                  filter: getGlowFilter(sponsorGlows.deere),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
            <Link href="https://www.caterpillar.com" isExternal>
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
            </Link>
            <Link href="https://www.qualcomm.com/" isExternal>
              <Image
                src="/sponsors/car_new/qual.png"
                pos="absolute"
                top="60%"
                left="18%"
                display="block"
                w="370px"
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
            </Link>
            <Link href="https://www.aechelon.com" isExternal>
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
            </Link>
          </Box>
          <AnimatedHeader>Sponsors</AnimatedHeader>
        </Box>
      </Box>

      {/* Large Tablet View */}
      <Box
        display={{ base: "none", lg: "flex", xl: "none" }}
        w="100%"
        // bgColor="#100E0E"
        pos="relative"
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: "400px", // Ensure all sponsors are visible
          "@media screen and (max-height: 700px)": {
            minHeight: "130vh" // Shorter tablet screens need more height
          }
        }}
      >
        <Box
          pos="relative"
          w="100%"
          h="90vh"
          maxH="800px"
          maxW="1200px"
          overflow="hidden"
          // bgColor="#100E0E"
          minH="700px"
        >
          <Box
            pos="absolute"
            top="52%"
            left="52%"
            transform="translate(-50%, -50%) scale(0.75)"
            w="100%"
            h="100%"
            transition="transform 0.5s ease"
          >
            <Image
              src="/sponsors/car/7.png"
              pos="absolute"
              top="15%"
              left="15%"
              transform="translate(-50%, -50%)"
              display="block"
              w="1300px"
              h="auto"
              animation={`${slideInUp} 1s ease-out`}
              css={{ animationDelay: "0.5s", animationFillMode: "both" }}
              transition="all 0.3s ease"
              _hover={{
                transform: "translate(-50%, -50%) scale(1.1)",
                filter:
                  "brightness(1.2) drop-shadow(0 0 30px rgba(255,0,0,0.5))",
                cursor: "pointer",
                outline: "none"
              }}
              _focus={{ outline: "none" }}
              zIndex={2}
            />
            <Link href="https://www.hudsonrivertrading.com/" isExternal>
              <Image
                src="/sponsors/car_new/hrt.png"
                pos="absolute"
                top="30%"
                left="-10%"
                display="block"
                w="220px"
                h="auto"
                animation={`${slideInLeft} 1.2s ease-out`}
                css={{ animationDelay: "0.2s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.3) translateX(-10px)",
                  filter: getGlowFilter(sponsorGlows.hrt),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
            <Link
              href="https://about.deere.com/en-us/our-company-and-purpose"
              isExternal
            >
              <Image
                src="/sponsors/car_new/deere.png"
                pos="absolute"
                top="-4%"
                left="55%"
                display="block"
                w="320px"
                h="auto"
                animation={`${slideInLeft} 1.2s ease-out`}
                css={{ animationDelay: "0.2s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.3) translateX(-10px)",
                  filter: getGlowFilter(sponsorGlows.deere),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
            <Link href="https://www.caterpillar.com" isExternal>
              <Image
                src="/sponsors/car_new/cat.png"
                pos="absolute"
                top="-2%"
                left="10%"
                display="block"
                w="320px"
                h="auto"
                animation={`${slideInLeft} 1.6s ease-out`}
                css={{ animationDelay: "0.4s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.3) translate(12px, 8px)",
                  filter: getGlowFilter(sponsorGlows.cat),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
            <Link href="https://www.qualcomm.com/" isExternal>
              <Image
                src="/sponsors/car_new/qual.png"
                pos="absolute"
                top="80%"
                left="18%"
                display="block"
                w="340px"
                h="auto"
                animation={`${slideInRight} 1.8s ease-out`}
                css={{ animationDelay: "0.5s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "scale(1.3) translate(12px, -12px)",
                  filter: getGlowFilter(sponsorGlows.qual),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
            <Link href="https://www.aechelon.com" isExternal>
              <Image
                src="/sponsors/car_new/aech.png"
                pos="absolute"
                bottom="-11%"
                left="55%"
                transform="translateX(-50%)"
                display="block"
                w="320px"
                h="auto"
                animation={`${slideInDown} 2s ease-out`}
                css={{ animationDelay: "0.6s", animationFillMode: "both" }}
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateX(-50%) scale(1.3) translateY(-12px)",
                  filter: getGlowFilter(sponsorGlows.aech),
                  cursor: "pointer",
                  outline: "none"
                }}
                _focus={{ outline: "none" }}
                zIndex={3}
              />
            </Link>
          </Box>
          <AnimatedHeader>Sponsors</AnimatedHeader>
        </Box>
      </Box>

      <Box
        display={{ base: "block", lg: "none" }}
        pos="relative"
        w="100%"
        overflow="hidden"
        // bg="#100E0E"
        color="white"
      >
        {/* Background art layer (behind content) */}
        <Box
          pos="absolute"
          inset="0"
          top="46%"
          left="50%"
          transform={{ base: "translate(-50%, -50%) scale(0.7)" }}
          w="100%"
          h="100%"
          transition="transform 0.5s ease"
          opacity={0.15}
          zIndex={1}
          pointerEvents="none"
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
            animation={`${slideInUp} 1s ease-out both`}
            style={{ animationDelay: "0.5s" }}
          />
          <Image
            src="/sponsors/car/5.png"
            pos="absolute"
            top="15%"
            right="-25%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInRight} 1.8s ease-out both`}
            style={{ animationDelay: "0.5s" }}
          />
          <Image
            src="/sponsors/car/2.png"
            pos="absolute"
            bottom="20%"
            left="-20%"
            display="block"
            w="250px"
            h="auto"
            animation={`${slideInLeft} 1.2s ease-out both`}
            style={{ animationDelay: "0.2s" }}
          />
          <Image
            src="/sponsors/car/4.png"
            pos="absolute"
            top="8%"
            left="-15%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInLeft} 1.6s ease-out both`}
            style={{ animationDelay: "0.4s" }}
          />
          <Image
            src="/sponsors/car/3.png"
            pos="absolute"
            bottom="20%"
            right="-15%"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInRight} 1.4s ease-out both`}
            style={{ animationDelay: "0.3s" }}
          />
          <Image
            src="/sponsors/car/6.png"
            pos="absolute"
            top="90%"
            right="-20%"
            transform="translateX(-50%)"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInDown} 2s ease-out both`}
            style={{ animationDelay: "0.6s" }}
          />
          <Image
            src="/sponsors/car/6.png"
            pos="absolute"
            top="90%"
            left="-20%"
            transform="translateX(-50%)"
            display="block"
            w="200px"
            h="auto"
            animation={`${slideInDown} 2s ease-out both`}
            style={{ animationDelay: "0.6s" }}
          />
        </Box>

        {/* Title */}
        <AnimatedHeader>Sponsors</AnimatedHeader>

        {/* Logo grid IN FLOW (no absolute positioning) */}
        <Box
          pos="relative"
          zIndex={5}
          px={4}
          mx="auto"
          w="100%"
          maxW="350px"
          display="flex"
          flexDir="column"
          alignItems="center"
          // this is the only vertical spacer under the header; it scales sanely
          pt={{ base: "clamp(48px, 12vh, 70px)" }}
          pb={{ base: "clamp(48px, 12vh, 70px)" }}
        >
          <SimpleGrid columns={1} spacing={10} w="100%">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out both`}
              style={{ animationDelay: "1s" }}
            >
              <Link href="https://www.caterpillar.com" isExternal>
                <Image
                  src="/sponsors/car_images/caterpillar.svg"
                  h="80px"
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
              animation={`${slideInUp} 1.2s ease-out both`}
              style={{ animationDelay: "1s" }}
            >
              <Link
                href="https://about.deere.com/en-us/our-company-and-purpose"
                isExternal
              >
                <Image
                  src="/sponsors/car_images/deere.png"
                  h="100px"
                  w="auto"
                  filter={getSubtleGlowFilter(sponsorGlows.deere)}
                  transition="all 0.3s ease"
                  _hover={{
                    filter: getGlowFilter(sponsorGlows.deere),
                    transform: "scale(1.1)"
                  }}
                />
              </Link>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              animation={`${slideInUp} 1.2s ease-out both`}
              style={{ animationDelay: "1.2s" }}
            >
              <Link href="https://www.hudsonrivertrading.com/" isExternal>
                <Image
                  src="/sponsors/car_images/hrt.svg"
                  h="80px"
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
              animation={`${slideInUp} 1.2s ease-out both`}
              style={{ animationDelay: "1.4s" }}
            >
              <Link href="https://www.qualcomm.com/" isExternal>
                <Image
                  src="/sponsors/car_images/qualcomm.png"
                  h="50px"
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
              animation={`${slideInUp} 1.2s ease-out both`}
              style={{ animationDelay: "1.6s" }}
            >
              <Link href="https://www.aechelon.com" isExternal>
                <Image
                  src="/sponsors/car_images/aechelon.png"
                  h="110px"
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
      </Box>
    </Box>
  );
};

export default PitStopSceneWrapper;
