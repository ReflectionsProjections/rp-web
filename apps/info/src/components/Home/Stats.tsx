import { Box, Flex, Heading, Text, Container, VStack } from "@chakra-ui/react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { AnimatedPillarsSection } from "@/components/AnimatedPillarsSection";

export const Stats = () => {
  return (
    <Box data-label="stats" id="stats-section" minH="110vh" py={10}>
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", md: "row" }} mb={16} align="center">
          <Box flex={1} p={4} w="100%">
            <Box
              w="100%"
              h="300px"
              position="relative"
              bg="gray.300"
              borderRadius="md"
              overflow="hidden"
            />
          </Box>

          <VStack flex={1} align="flex-start" p={4} spacing={4}>
            <Heading as="h2" size="lg" fontWeight="bold">
              build your future now
            </Heading>
            <Text fontSize="sm">
              RP is a week-long ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </Text>
          </VStack>
        </Flex>

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
      </Container>
    </Box>
  );
};
