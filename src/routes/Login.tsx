import rpLogo from '../assets/rp_logo.svg';
import '../App.css';
import '@fontsource/roboto-slab/300.css';
import { Box, Button, Flex, Heading, Image, Text, VStack, Center, HStack, useMediaQuery } from '@chakra-ui/react';

export default function Login() {
  const [isMedium] = useMediaQuery("(max-width: 850px)");
  const [isSmall] = useMediaQuery("(max-width: 600px)");
  const [isXSmall] = useMediaQuery("(max-width: 400px)");

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      bg="linear-gradient(to bottom right, blue.500, purple.600)"
      position="relative"
    >
      <Center>
        <Image transition={'all 0.4s ease-in-out'} _hover={{ transform: 'scale(1.2) rotate(360deg)' }} src={rpLogo} alt="R|P Logo" boxSize="200px" mb='40px' />
      </Center>

      <VStack spacing={4} mb={8}>
        <Center>
          <Box p='4' >
            <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
              <Text fontSize={isXSmall ? "20" : isSmall ? "28" : isMedium ? "43" : "56"} fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> reflections </Text>
              <Text fontSize={isXSmall ? "52" : isSmall ? "60" : isMedium ? "76" : "120"} fontFamily={"Roboto Slab"} fontWeight={"300"} letterSpacing={"0.08em"} mt="-10px"> |</Text>
              <Text fontSize={isXSmall ? "20" : isSmall ? "28" : isMedium ? "43" : "56"} fontFamily={"Roboto Slab"} fontWeight={"700"} letterSpacing={"0.08em"}> projections </Text>
            </HStack>
            {/* <Text fontSize={isXSmall ? "14" : isSmall ? "20" : isMedium ? "26" : "30" } whiteSpace="pre-line" fontFamily={"Nunito"} fontWeight={"400"}>Admin Site</Text> */}
          </Box>
        </Center>
        <Heading fontFamily={"Nunito"} fontSize={'40'} as="h1" size="xl" fontWeight="semibold" mt="-50px">
          Admin Site
        </Heading>
      </VStack>

      <Button
        colorScheme="blue"
        size="lg"
        fontWeight="bold"
        onClick={() => { window.location.href = "/auth/"; }}
        fontFamily={"Roboto Slab"}
      >
        Log In
      </Button>
    </Flex>
  );
}
