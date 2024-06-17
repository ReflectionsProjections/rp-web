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
        <img src="https://media4.giphy.com/media/EIiJp9cQ3GeEU/200w.gif?cid=6c09b9521v3xilt7ask9eq8tusgnq6h6nmidxvgefftk6r57&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="Under Construction" />
      </Flex>
    </Box>
  )
}
  
  
export default Notifications;