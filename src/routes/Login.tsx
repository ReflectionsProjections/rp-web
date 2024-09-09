import rpLogo from '../assets/rp_logo.png';
import '../App.css';
import { Button, Box, Image, Flex } from '@chakra-ui/react';

export default function Login() {
  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" maxHeight="100vh">
      <Box position="absolute" left="0" top="0" padding="2">
        <Image src={rpLogo} alt='R|P Logo' boxSize='80px' />
      </Box>
  
      <Box alignSelf="center" padding="4">
        <h1 style={{  fontWeight: 'bold' }}>R | P Admin</h1>
      </Box>
  
      <Button colorScheme='blue' onClick={() => { window.location.href = "/#/auth/"; }}>Log In</Button>
      {/* <Button colorScheme='red' onClick={() => { window.location.href = "/#/home/"; }}>Home</Button> */}
    </Flex>
  );
}