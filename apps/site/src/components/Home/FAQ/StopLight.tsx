import { Box, HStack, VStack } from "@chakra-ui/react";

type StopLightProps = {
  active: boolean;
  hasBar?: boolean;
};

export const StopLight: React.FC<StopLightProps> = ({ active, hasBar }) => {
  return (
    <HStack gap={0}>
      <Box
        w={{ base: "36px", md: "48px" }}
        px={{ base: 1, md: 2 }}
        py={{ base: 2, md: 3 }}
        bgGradient="linear(to-b, rgb(50,50,50), rgb(40,40,40))"
        borderRadius="md"
        boxShadow="0 4px 8px rgba(0,0,0,0.6)"
      >
        <VStack spacing={{ base: 2, md: 3 }}>
          <Box
            w={{ base: "16px", md: "24px" }}
            h={{ base: "16px", md: "24px" }}
            borderRadius="full"
            bg={active ? "green.300" : "red.500"}
            boxShadow="inset 0 0 4px rgba(0,0,0,0.7)"
            transition="all 0.2s ease-in-out"
          />
          <Box
            w={{ base: "16px", md: "24px" }}
            h={{ base: "16px", md: "24px" }}
            borderRadius="full"
            bg={active ? "green.300" : "red.500"}
            boxShadow="inset 0 0 4px rgba(0,0,0,0.7)"
            transition="all 0.2s ease-in-out"
          />
        </VStack>
      </Box>

      {hasBar && (
        <VStack
          gap={{ base: 1, md: 2 }}
          mb={{ base: "30%", md: "40%" }}
          align="start"
        >
          <Box
            w={{ base: "14px", md: "20px" }}
            h={{ base: "4px", md: "5px" }}
            bg="gray.600"
          />
          <Box
            w={{ base: "14px", md: "20px" }}
            h={{ base: "4px", md: "5px" }}
            bg="gray.500"
          />
        </VStack>
      )}
    </HStack>
  );
};
