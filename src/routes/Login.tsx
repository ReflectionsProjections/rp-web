// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import rpLogo from '../assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import '../App.css'
// import axios from 'axios';
// import { Navigate } from "react-router-dom";
import { Button, Box, Image, Flex } from '@chakra-ui/react'
// import { Navigate } from "react-router-dom";

// const AUTH_URL = "/auth/"

// const POST_AUTH_URL = "/#/home/"

export default function Login() {
  // const [searchParams] = useSearchParams();

  // const handleJWT = () => {

  //   const urlSearchParams = new URLSearchParams(window.location.search);
  //   const token = urlSearchParams.get("token");
  //   console.log("token:", token);

  //   // jwt = searchParams.get("token");
  //   // console.log("jwt:", jwt);

  //   if (token) {
  //       localStorage.setItem("jwt", token);
  //       console.log("Redirecting to post-auth URL...");
  //       return <Navigate to={POST_AUTH_URL} />;
  //   }
  // }
    // const [count, setCount] = useState(0)
    // const handleLogin = () => {
    //     console.log('Logging in...');
    //     //   try {
    //     //     // Making the API call
    //     //     // const response = await axios.get('https://api.reflectionsprojections.org/auth/login/web');
    //     //     // // Redirecting to the URL received from the API
    //     //     // console.log('Login successful:', response);
    //     //     // console.log('Redirecting to:', response.request.responseURL);
    //     window.location.href = 'https://api.reflectionsprojections.org/auth/login/web/';
    //     //   } catch (error) {
    //     //     console.error('Login failed:', error);
    //     //     // Handle errors here, such as showing a notification
    //     //   }
    //     // return <Navigate to={AUTH_URL} />;
    // };
  
    return (
      <Flex direction="column" align="center" justify="center" minHeight="100vh" maxHeight="100vh">
  
        {/* <Box alignSelf="flex-start" padding="2">
          <Image src={rpLogo} alt='R|P Logo' boxSize='sm' />
        </Box> */}
        <Box position="absolute" left="0" top="0" padding="2">
          <Image src={rpLogo} alt='R|P Logo' boxSize='80px' />
        </Box>
  
        <Box alignSelf="center" padding="4">
          <h1 style={{  fontWeight: 'bold' }}>R | P Admin</h1>
        </Box>
  
        <Button colorScheme='blue' onClick={() => { window.location.href = "/#/auth/" }}>Log In</Button>
        <Button colorScheme='red' onClick={() => { window.location.href = "/#/home/" }}>Home</Button>
        {/* <Button colorScheme='green' onClick={handleJWT}>Check JWT</Button> */}
        {/* <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p> */}
      </Flex>
    )
}