import rpLogo from '../assets/rp_logo.png';
import '../App.css';
import { Button, Box, Image, Flex } from '@chakra-ui/react';

export default function Unauthorized() {

  function logOut() {
    console.log("Logging out...");
    localStorage.removeItem("jwt");
    window.location.href = "/auth/";
  }

  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" maxHeight="100vh">
      <Box position="absolute" left="0" top="0" padding="2">
        <Image src={rpLogo} alt='R|P Logo' boxSize='80px' />
      </Box>
  
      <Box alignSelf="center" padding="4">
        <h1 style={{  fontWeight: 'bold' }}>Woah! What are you doing here?</h1>
        <h2 style={{  fontWeight: 'bold' }}>You are not authorized to view this page. Please log in with an authorized account.</h2>
      </Box>
  
      <Button colorScheme='red' onClick={() => logOut()}>Log Out</Button>
    </Flex>
  );
}
