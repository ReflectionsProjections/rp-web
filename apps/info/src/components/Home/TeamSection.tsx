import { Box, Flex, Heading, Container, Button } from "@chakra-ui/react";
import CircularCarousel from "../Carousel";
import { NavLink } from "react-router-dom";

export const TeamSection = () => {
  const teamCards: { title: string; image: string }[] = [
    { title: "Dev", image: "logo_2018.svg" },
    { title: "Design", image: "logo_2019.svg" },
    { title: "Marketing", image: "logo_2020.svg" },
    { title: "Content", image: "logo_2021.svg" },
    { title: "Ops", image: "logo_2022.svg" }
  ];

  return (
    <Box data-label="team section" minH="40vh" py={10}>
      <Container maxW="container.xl">
        <Box textAlign="center" mt={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2">
            Meet the Team
          </Heading>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 0 }}
          justify="space-between"
          textAlign="center"
        >
          <CircularCarousel items={teamCards} />
        </Flex>
        <Button
          as={NavLink}
          to="/archive"
          colorScheme="teal"
          bgColor="teal.300"
          size="lg"
          position="relative"
          left="80%"
          top="-150px"
          mx="auto"
          px={8}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Join us!
        </Button>
      </Container>
    </Box>
  );
};
