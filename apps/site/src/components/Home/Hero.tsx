import { Box, Text } from "@chakra-ui/react";

export default function Hero() {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems={"center"}
      width="100%"
      textColor="black"
      bgColor="white"
      py={"100px"}
      gap="20px"
    >
      <Text fontSize="5xl">Reflections | Projections 2025</Text>
    </Box>
  );
}
