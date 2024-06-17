import {
  Box,
  Flex,
} from '@chakra-ui/react';
  
function Notifications() {
    
  return (
    <Box flex="1" minW='90vw' p={4}>
      <Box textAlign="center" fontSize="xl" fontWeight="bold">
            Notifications Page Coming Soon!
      </Box>
      <br />
      <Flex justify="center">
        <img src="https://i.pinimg.com/originals/f9/28/e2/f928e27b6513d0d9c25a1b80293b12d1.png" alt="Under Construction" />
      </Flex>
    </Box>
  )
}
  
  
export default Notifications;