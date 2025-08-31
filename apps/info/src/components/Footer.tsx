import { Box, Flex, Heading, Text, Container } from "@chakra-ui/react";
import { HoverIconLink } from "@/components/HoverIconLink";

export const Footer = () => {
  // const logoCircles: { title: string; link: string; src: string }[] = [
  //   {
  //     title: "Instagram",
  //     link: "https://reflectionsprojections.org",
  //     src: "rp2024shine_logo.png"
  //   },
  //   {
  //     title: "Instagram",
  //     link: "https://example.com",
  //     src: "rp2024shine_logo.png"
  //   },
  //   {
  //     title: "Instagram",
  //     link: "reflectionsprojections.org",
  //     src: "rp2024shine_logo.png"
  //   },
  //   {
  //     title: "Instagram",
  //     link: "reflectionsprojections.org",
  //     src: "rp2024shine_logo.png"
  //   },
  //   {
  //     title: "Instagram",
  //     link: "reflectionsprojections.org",
  //     src: "rp2024shine_logo.png"
  //   },
  //   {
  //     title: "Instagram",
  //     link: "reflectionsprojections.org",
  //     src: "rp2024shine_logo.png"
  //   }
  // ];

  return (
    <Box data-label="footer" minH="40vh" py={10} mb="5vh">
      <Container maxW="container.xl">
        <Box textAlign="center" my={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2">
            Contact Us!
          </Heading>
        </Box>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 20 }}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
          pt="80px"
        >
          <Box w="100%" px="20px">
            <Text>
              RP is a week-long ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </Text>
          </Box>
          <Flex
            w="100%"
            direction={{ base: "row", md: "column" }}
            justifyContent="center"
            alignItems="center"
            gap={{ base: "10", md: "10" }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "10", md: "10" }}
            >
              <HoverIconLink
                link={"https://reflectionsprojections.org"}
                src="instagram_logo.png"
              />
              <HoverIconLink
                link={"https://reflectionsprojections.org"}
                src="instagram_logo.png"
              />
              <HoverIconLink
                link={"https://reflectionsprojections.org"}
                src="instagram_logo.png"
              />
            </Flex>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "10", md: "10" }}
            >
              <HoverIconLink
                link={"https://reflectionsprojections.org"}
                src="instagram_logo.png"
              />
              <HoverIconLink
                link={"https://reflectionsprojections.org"}
                src="instagram_logo.png"
              />
              <HoverIconLink
                link={"https://2024.reflectionsprojections.org"}
                src="rp2024shine_logo.png"
              />
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
