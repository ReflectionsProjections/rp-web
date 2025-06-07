import { AiOutlineStop } from "react-icons/ai";
import "../App.css";
import { Button, Box, Flex, Center, Icon } from "@chakra-ui/react";

const Unauthorized = () => {
  const signOut = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="100vh"
      maxHeight="100vh"
    >
      <Center>
        <Icon as={AiOutlineStop} fill="red" boxSize="80px" />
      </Center>
      <Box alignSelf="center" padding="4">
        <h1 style={{ fontWeight: "bold" }}>Woah! What are you doing here?</h1>
        <h2 style={{ fontWeight: "bold" }}>
          You are not authorized to view this page. Please log in with an
          authorized account.
        </h2>
      </Box>

      <Button colorScheme="red" onClick={() => signOut}>
        Log Out
      </Button>
    </Flex>
  );
};

export default Unauthorized;
