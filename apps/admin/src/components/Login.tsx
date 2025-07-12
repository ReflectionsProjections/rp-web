import rpLogo from "../assets/rp_logo.svg";

import "@fontsource/roboto-slab";
import "@fontsource/nunito";

import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  VStack,
  Center,
  HStack,
  Heading
} from "@chakra-ui/react";
import { googleAuth } from "@rp/shared";

export default function Login() {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Center>
        <Image
          transition={"all 0.4s ease-in-out"}
          _hover={{ transform: "scale(1.2) rotate(360deg)" }}
          src={rpLogo}
          alt="R|P Logo"
          boxSize="200px"
          mb="10px"
        />
      </Center>

      <VStack spacing={4} mb={8}>
        <Center>
          <Box p="4">
            <HStack justifyContent="center" spacing={4} textAlign={"center"}>
              <Heading
                size={{ base: "lg", md: "3xl" }}
                fontFamily={"Roboto Slab"}
                fontWeight={"700"}
                letterSpacing={"0.08em"}
              >
                reflections
              </Heading>
              <Heading
                size={{ base: "xl", md: "4xl" }}
                fontFamily={"Roboto Slab"}
                fontWeight={"300"}
                letterSpacing={"0.08em"}
              >
                |
              </Heading>
              <Heading
                size={{ base: "lg", md: "3xl" }}
                fontFamily={"Roboto Slab"}
                fontWeight={"700"}
                letterSpacing={"0.08em"}
              >
                projections
              </Heading>
            </HStack>
            {/* <Text fontSize={isXSmall ? "14" : isSmall ? "20" : isMedium ? "26" : "30" } whiteSpace="pre-line" fontFamily={"Nunito"} fontWeight={"400"}>Admin Site</Text> */}
          </Box>
        </Center>
        <Text
          fontFamily={"Nunito"}
          fontSize={"40"}
          as="h1"
          size="xl"
          fontWeight={"900"}
        >
          Admin Site
        </Text>
      </VStack>

      <Button
        colorScheme="blue"
        size="lg"
        fontWeight="bold"
        onClick={() => {
          googleAuth(true);
        }}
        fontFamily={"Nunito"}
      >
        Log In
      </Button>
    </Flex>
  );
}
