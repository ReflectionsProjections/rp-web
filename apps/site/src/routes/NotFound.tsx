import { Box, VStack, Text, Button, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      w="100vw"
      h="100vh"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      background="linear-gradient(135deg, #12131A 0%, #7B0201 50%, #B91C1C 100%)"
      color="white"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
    >
      <VStack spacing={8} textAlign="center" maxW="600px" px={8}>
        {/* Racing Meme */}
        <Image
          src="/faq/meme.jpg"
          alt="When you turn off traction control - F1 car spinning on grass"
          maxW="400px"
          w="100%"
          borderRadius="lg"
          boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
          mb={4}
        />

        <VStack spacing={4}>
          <Heading
            fontSize="8xl"
            fontWeight="bold"
            color="#FFE4E4"
            lineHeight="0.8"
            textShadow="0 0 20px rgba(255, 107, 53, 0.5)"
          >
            404
          </Heading>
          <Heading
            fontSize="2xl"
            fontWeight="semibold"
            color="#FFE4E4"
            fontFamily="Roboto Slab"
          >
            Page Not Found
          </Heading>
          <Text fontSize="lg" color="#D1D5DB" textAlign="center" opacity="0.9">
            Sorry, this page didn't make it to the finish line. It might have
            been moved, deleted, or you took a wrong turn on the URL track.{" "}
          </Text>
          <Text fontSize="lg" color="#D1D5DB" textAlign="center" opacity="0.9">
            Don't worry—no penalty for cutting the corner this time.{" "}
          </Text>
        </VStack>

        <VStack spacing={4}>
          <Button
            onClick={() => {
              void navigate("/");
            }}
            bg="#f5bc43"
            color="black"
            size="lg"
            fontSize="md"
            fontWeight="semibold"
            fontFamily="ProRacing"
            px={8}
            py={6}
            _hover={{
              bg: "#EAA001",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(245, 188, 67, 0.3)"
            }}
            _active={{
              bg: "#D4900A",
              transform: "translateY(0)"
            }}
            transition="all 0.2s"
            boxShadow="0 4px 15px rgba(245, 188, 67, 0.2)"
          >
            Go Home
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
