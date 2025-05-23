// src/components/Navbar.tsx
import { Box, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box bg="gray.100" px={4} py={2} shadow="md">
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold">Info.RP</Text>
        <HStack spacing={4}>
          <Link as={NavLink} to="/">
            Home
          </Link>
          <Link as={NavLink} to="/archive">
            Archive
          </Link>
          <Link as={NavLink} to="/faq">
            FAQ
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};
