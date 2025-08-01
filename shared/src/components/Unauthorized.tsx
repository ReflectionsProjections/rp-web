import { AiOutlineStop } from "react-icons/ai";
import { Button, Box, Flex, Center, Icon } from "@chakra-ui/react";

const Unauthorized = () => {
  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.href = "/";
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      <Center>
        <Icon as={AiOutlineStop} fill="red" boxSize="80px" />
      </Center>
      <Box alignSelf="center" padding="4" textAlign="center">
        <h1 style={{ fontWeight: "bold" }}>Woah! What are you doing here?</h1>
        <h2 style={{ fontWeight: "bold" }}>
          You are not authorized to view this page. Please log in with an
          authorized account.
        </h2>
      </Box>

      <Button colorScheme="red" onClick={signOut}>
        Log Out
      </Button>
    </Flex>
  );
};

export default Unauthorized;
