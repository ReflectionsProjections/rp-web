// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import rpLogo from '../assets/rp_logo.png'
// import viteLogo from '/vite.svg'
import '../App.css'
// import axios from 'axios';
import { Button, Box, Image, Flex } from '@chakra-ui/react'

export default function Home() {
    // const [count, setCount] = useState(0)
    const printToken = () => {
      console.log('Home page');
      const jwt = localStorage.getItem("jwt");
      console.log("jwt:", jwt);
    }
    
  
    return (
      <Flex direction="column" align="center" justify="center" minHeight="100vh" maxHeight="100vh">
  
        {/* <Box alignSelf="flex-start" padding="2">
          <Image src={rpLogo} alt='R|P Logo' boxSize='sm' />
        </Box> */}
        <Box position="absolute" left="0" top="0" padding="2">
          <Image src={rpLogo} alt='R|P Logo' boxSize='80px' />
        </Box>
  
        <Box alignSelf="center" padding="4">
          <h1 style={{  fontWeight: 'bold' }}>R | P Admin LOGGED IN</h1>
        </Box>
  
        <Button colorScheme='red' onClick={printToken} >Logged In</Button>
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