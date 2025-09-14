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
        {/* Gradient overlay for fade effect - responsive opacity */}
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

        {/* Content container */}
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
            <VStack
              align="flex-start"
              p={8}
              spacing={4}
              maxW="400px"
              w={{ base: "100%", md: "50%" }}
            >
              <Heading as="h2" size="lg" fontWeight="bold" color="black" px={4}>
                build your future now
              </Heading>
              <Text fontSize="lg" color="black" px={4} py={2}>
                RP is a week-long ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute
              </Text>
            </VStack>
          </Flex>
        </Container>
      </Box>

      {/* Stats section without background */}
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
            <Flex // numbers
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
                // pillars
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
