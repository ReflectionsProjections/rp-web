import { Box, Flex, Heading, Text, Container, VStack } from "@chakra-ui/react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { AnimatedPillarsSection } from "@/components/AnimatedPillarsSection";

export const Stats = () => {
  return (
    <>
      {/* Full-width background section */}
      <Box
        position="relative"
        minH="40vw"
        backgroundImage="url('build_future.jpg')"
        backgroundSize="cover"
        backgroundPosition="center 75%"
        backgroundRepeat="no-repeat"
        zIndex={1}
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          background={{
            base: "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0.5) 100%)",
            md: "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.1) 100%)"
          }}
          zIndex={1}
        />

        <Container
          maxW="container.xl"
          height="100%"
          position="relative"
          zIndex={2}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            py={8}
            minH="400px"
            justify="flex-end"
          >
            <Box
              maxW="400px"
              w={{ base: "100%", md: "50%" }}
              mt={{ base: 0, md: 8 }}
              mr={{ base: 0, md: 16 }}
              bg="rgba(255, 240, 240, 0.92)"
              backdropFilter="blur(10px)"
              borderRadius="xl"
              boxShadow="0 8px 32px rgba(220, 38, 38, 0.15)"
              border="1px solid black"
              transform="perspective(1000px) rotateX(-2deg) rotateY(-30deg) translateZ(10px)"
              transition="all 0.4s ease-in-out"
              _hover={{
                transform:
                  "perspective(1000px) rotateX(2deg) rotateY(-2deg) translateZ(-20px)",
                cursor: "default",
                boxShadow: "0 4px 16px rgba(220, 38, 38, 0.25)"
              }}
              sx={{
                transformStyle: "preserve-3d"
              }}
            >
              <VStack align="flex-start" p={8} spacing={4}>
                <Heading
                  as="h2"
                  size="lg"
                  fontWeight="bold"
                  color="black"
                  transition="all 0.3s ease-in-out"
                >
                  build your future now
                </Heading>
                <Text
                  fontSize="lg"
                  color="black"
                  transition="all 0.3s ease-in-out"
                >
                  Reflections | Projections is the Midwest's <em>largest</em>{" "}
                  student-run conference. Meet industry and academic leaders,
                  learn new skills, and connect with other students!
                </Text>
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box data-label="stats" id="stats-section" py={10}>
        <Container maxW="container.xl">
          <div id="stats">
            <Box textAlign="center" pt={16} mb={16}>
              <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2">
                The Midwest's Largest Student-Run
                <br />
                Tech Conference
              </Heading>
            </Box>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: 8, md: 0 }}
              justify="space-between"
              textAlign="center"
              pos="relative"
              zIndex={5}
            >
              <VStack spacing={1} width={{ base: "auto", md: "20%" }}>
                <Heading as="h3" size="xl" fontWeight="bold">
                  <AnimatedCounter value="2000" after="+" />
                </Heading>
                <Text>attendees</Text>
              </VStack>
              <VStack spacing={1} width={{ base: "auto", md: "20%" }}>
                <Heading as="h3" size="xl" fontWeight="bold">
                  <AnimatedCounter value="30" after="+" />
                </Heading>
                <Text>years</Text>
              </VStack>
              <VStack spacing={1} width={{ base: "auto", md: "20%" }}>
                <Heading as="h3" size="xl" fontWeight="bold">
                  <AnimatedCounter value="50" after="+" />
                </Heading>
                <Text>companies</Text>
              </VStack>
              <VStack spacing={1} width={{ base: "auto", md: "20%" }}>
                <Heading as="h3" size="xl" fontWeight="bold">
                  <AnimatedCounter value="20" after="+" />
                </Heading>
                <Text>speakers</Text>
              </VStack>
              <VStack spacing={1} width={{ base: "auto", md: "20%" }}>
                <Heading as="h3" size="xl" fontWeight="bold">
                  <AnimatedCounter value="20" after="+" />
                </Heading>
                <Text>events</Text>
              </VStack>
            </Flex>
            <AnimatedPillarsSection
              icons={[
                "icon_person.svg",
                "icon_calendar.svg",
                "icon_building.svg",
                "icon_speaker.svg",
                "icon_location.svg"
              ]}
            />
          </div>
        </Container>
      </Box>
    </>
  );
};
