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
    <Box data-label="sponsor section" minH="40vh" overflowX="hidden" py={10}>
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

        {/* Desktop layout: three disjoint stacks (rotated left, straight middle, rotated right) */}
        <Flex
          display={{ base: "none", lg: "flex" }}
          direction="row"
          gap={0}
          justify="center"
          align="center"
          width="100%"
          position="relative"
        >
          {/* LEFT GROUP: rotated +15deg (mirror/inward tilt) */}
          <Box
            transform="rotate(15deg)"
            transformOrigin="center"
            mr="-12px"
            mt="-24px"
          >
            {/* OUTER BACKDROP */}
            <Box bg="#B8B8B8" p={4}>
              {/* INNER BACKDROP */}
              <Box bg="#D5D5D5" p={6}>
                {/* CARD */}
                <Flex
                  bg="#FFFBE6" /* lighter pastel yellow */
                  minH="xs"
                  py="40px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="20px"
                  width="280px"
                  border="3px solid black"
                >
                  <VStack w="60%" height="100%" justifyContent="space-between">
                    <Image w="30px" h="30px" src="card_icon_1.svg" />
                    <Text as="b" fontSize="lg" my="10px" textAlign="center">
                      Gain Access to Targeted Marketing Channels
                    </Text>
                    <Text fontSize="sm" textAlign="center">
                      Reach your ideal customers with our platform.
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Box>

          {/* MIDDLE GROUP: straight/flat backdrops + card 2 */}
          <Box mx={{ md: 0 }}>
            {/* OUTER BACKDROP */}
            <Box bg="#B8B8B8" p={4}>
              {/* INNER BACKDROP */}
              <Box bg="#D5D5D5" p={6}>
                {/* CARD */}
                <Flex
                  bg="#F5D2D2"
                  minH="xs"
                  py="40px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="20px"
                  width="360px"
                  border="3px solid black"
                >
                  <VStack w="60%" height="100%" justifyContent="space-between">
                    <Image w="30px" h="30px" src="card_icon_2.svg" />
                    <Text as="b" fontSize="lg" my="10px" textAlign="center">
                      Enhance Brand Recognition and Loyalty
                    </Text>
                    <Text fontSize="sm" textAlign="center">
                      Build lasting relationships with our UIUC community.
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Box>

          {/* RIGHT GROUP: existing rotated -15deg card */}
          <Box
            transform="rotate(-15deg)"
            transformOrigin="center"
            ml="-12px"
            mt="-40px"
          >
            {/* OUTER BACKDROP */}
            <Box bg="#B8B8B8" p={4}>
              {/* INNER BACKDROP */}
              <Box bg="#D5D5D5" p={6}>
                {/* CARD */}
                <Flex
                  bg="#E7F2EF"
                  minH="xs"
                  py="40px"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="20px"
                  width="280px"
                  border="3px solid black"
                >
                  <VStack w="60%" height="100%" justifyContent="space-between">
                    <Image w="30px" h="30px" src="card_icon_3.svg" />
                    <Text as="b" fontSize="lg" my="10px" textAlign="center">
                      Receive Comprehensive Support and Resources
                    </Text>
                    <Text fontSize="sm" textAlign="center">
                      Access tools and guidance to maximize your impact.
                    </Text>
                  </VStack>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Flex>

        {/* Mobile layout: keep original stacked three cards within one backdrop */}
        <Box display={{ base: "block", lg: "none" }}>
          <Box>
            {/* OUTER BACKDROP (lighter) */}
            <Box bg="#B8B8B8" p={{ base: 3 }}>
              {/* INNER BACKDROP (even lighter) */}
              <Box bg="#D5D5D5" p={{ base: 4 }}>
                {/* CARD STACK */}
                <VStack gap={6}>
                  <Flex
                    bg="#FFFBE6"
                    minH="xs"
                    py="40px"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="20px"
                    w="100%"
                    border="3px solid black"
                  >
                    <VStack
                      w="60%"
                      height="100%"
                      justifyContent="space-between"
                    >
                      <Image w="30px" h="30px" src="card_icon_1.svg" />
                      <Text as="b" fontSize="lg" my="10px" textAlign="center">
                        Gain Access to Targeted Marketing Channels
                      </Text>
                      <Text fontSize="sm" textAlign="center">
                        Reach your ideal customers with our platform.
                      </Text>
                    </VStack>
                  </Flex>

                  <Flex
                    bg="#F5D2D2"
                    minH="xs"
                    py="40px"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="20px"
                    w="100%"
                    border="3px solid black"
                  >
                    <VStack
                      w="60%"
                      height="100%"
                      justifyContent="space-between"
                    >
                      <Image w="30px" h="30px" src="card_icon_2.svg" />
                      <Text as="b" fontSize="lg" my="10px" textAlign="center">
                        Enhance Brand Recognition and Loyalty
                      </Text>
                      <Text fontSize="sm" textAlign="center">
                        Build lasting relationships with our UIUC community.
                      </Text>
                    </VStack>
                  </Flex>

                  <Flex
                    bg="#E7F2EF"
                    minH="xs"
                    py="40px"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="20px"
                    w="100%"
                    border="3px solid black"
                  >
                    <VStack
                      w="60%"
                      height="100%"
                      justifyContent="space-between"
                    >
                      <Image w="30px" h="30px" src="card_icon_3.svg" />
                      <Text as="b" fontSize="lg" my="10px" textAlign="center">
                        Receive Comprehensive Support and Resources
                      </Text>
                      <Text fontSize="sm" textAlign="center">
                        Access tools and guidance to maximize your impact.
                      </Text>
                    </VStack>
                  </Flex>
                </VStack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Button
          margin="60px auto 20px"
          w={{ base: "70%", md: "20%" }}
          display="block"
          bg="#5F5D58"
          borderRadius="100px"
          color="white"
          textAlign="center"
          _hover={{ bg: "gray.200", color: "#5F5D58" }}
        >
          Interest Form
        </Button>
      </Container>
    </Box>
  );
};
