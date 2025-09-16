import {
  Box,
  Container,
  Heading,
  Image,
  Link,
  Text,
  VStack,
  HStack,
  useBreakpointValue
} from "@chakra-ui/react";

export default function AppScreen() {
  const titleSize = useBreakpointValue({ base: "2xl", md: "4xl", lg: "5xl" });

  return (
    <Box minH="100vh" w="100%" pos="relative" overflow="hidden" bg="black">
      {/* Background SVG */}
      <Box
        pos="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex={1}
        opacity={0.9}
      >
        <Image
          src="/appscreen/app_bg.svg"
          alt="App Background"
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      {/* Content Overlay */}
      <Box
        pos="relative"
        zIndex={2}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Container maxW="container.xl" px={6}>
          <VStack spacing={8} textAlign="center" color="white" py={20}>
            {/* Main Title */}
            <Heading
              as="h1"
              fontSize={titleSize}
              fontWeight="bold"
              fontFamily="ProRacing"
              textShadow="2px 2px 4px rgba(0,0,0,0.8)"
              lineHeight="1.2"
            >
              Download the App today!
            </Heading>

            {/* Subtitle */}
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="Magistral"
              maxW="600px"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
              opacity={0.9}
            >
              Experience Reflections | Projections like never before with our
              mobile app. Stay connected, track your progress, and never miss an
              update.
            </Text>

            <HStack
              spacing={6}
              flexDir={{ base: "column", sm: "row" }}
              align="center"
              justify="center"
            >
              <Link
                href="https://apps.apple.com/us/app/r-p-2025/id6744465190"
                isExternal
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s ease"
              >
                <Image
                  src="/appscreen/app_store.png"
                  alt="Download on the App Store"
                  h={{ base: "50px", md: "60px" }}
                  w="auto"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                  _hover={{
                    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
                  }}
                />
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=com.reflectionsprojections&utm_source=na_Med"
                isExternal
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s ease"
              >
                <Image
                  src="/appscreen/google_play.png"
                  alt="Get it on Google Play"
                  h={{ base: "50px", md: "60px" }}
                  w="auto"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                  _hover={{
                    filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
                  }}
                />
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}
