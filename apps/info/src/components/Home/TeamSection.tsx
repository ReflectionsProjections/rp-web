import { Box, Flex, Heading, Container, Button } from "@chakra-ui/react";
import CircularCarousel from "../Carousel";
import { NavLink } from "react-router-dom";

export const TeamSection = () => {
  const teamCards: { title: string; image: string }[] = [
    { title: "Ops", image: "/Ops/Full.JPG" },
    { title: "Design", image: "/Design/Full.JPG" },
    { title: "Marketing", image: "Marketing/Full.JPG" },
    { title: "Content", image: "/Content/Full.JPG" },
    { title: "Corporate", image: "/Corporate/Full.JPG" },
    {
      title: "Dev",
      image: "/Dev/Full.JPG"
    }
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
          <CircularCarousel
            items={teamCards}
            centerItem={{ title: "Directors", image: "DIRECTORS.JPG" }}
          />
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
