import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  VStack,
  Button,
  Image
} from "@chakra-ui/react";

export const SponsorSection = () => {
  return (
    <Box data-label="sponsor section" minH="40vh" py={10}>
      <Container maxW="container.xl">
        <Box textAlign="center" mt={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="1.2">
            Interested in Sponsoring?
          </Heading>
        </Box>
        <Box textAlign="center" my="60px">
          <Text fontSize="sm" lineHeight="1.2" maxW="xl" margin="auto">
            Partnering with us offers unique visibility and engagement with our
            audience. Elevate your brand while supporting our mission.
          </Text>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 8, md: 8 }}
          justify="space-between"
          textAlign="center"
          width="100%"
        >
          <Flex
            bg="rgba(213, 209, 200, 0.5)"
            minH="xs"
            py="40px"
            justifyContent="center"
            alignItems="center"
            borderRadius="20px"
          >
            <VStack w="60%" height="100%" justifyContent="space-between">
              <Image w="30px" h="30px" src="card_icon_1.svg" />
              <Text as="b" fontSize="lg" my="10px">
                Gain Access to Targeted Marketing Channels
              </Text>
              <Text fontSize="sm">
                Reach your ideal customers with our platform.
              </Text>
            </VStack>
          </Flex>
          <Flex
            bg="rgba(188, 204, 203, 0.5)"
            minH="xs"
            py="40px"
            justifyContent="center"
            alignItems="center"
            borderRadius="20px"
          >
            <VStack w="60%" height="100%" justifyContent="space-between">
              <Image w="30px" h="30px" src="card_icon_2.svg" />
              <Text as="b" fontSize="lg" my="10px">
                Enhance Brand Recognition and Loyalty
              </Text>
              <Text fontSize="sm">
                Build lasting relationships with our UIUC community.
              </Text>
            </VStack>
          </Flex>
          <Flex
            bg="rgba(233, 232, 227, 0.9)"
            minH="xs"
            py="40px"
            justifyContent="center"
            alignItems="center"
            borderRadius="20px"
          >
            <VStack w="60%" height="100%" justifyContent="space-between">
              <Image w="30px" h="30px" src="card_icon_3.svg" />
              <Text as="b" fontSize="lg" my="10px">
                Receive Comprehensive Support and Resources
              </Text>
              <Text fontSize="sm">
                Access tools and guidance to maximize your impact.
              </Text>
            </VStack>
          </Flex>
        </Flex>
        <Button
          margin="60px auto 20px"
          w="20%"
          display="block"
          bg="#5F5D58"
          borderRadius="100px"
          color="white"
          textAlign="center"
          _hover={{
            bg: "gray.200",
            color: "#5F5D58"
          }}
        >
          Interest Form
        </Button>
      </Container>
    </Box>
  );
};
