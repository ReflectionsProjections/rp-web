import { Box, Flex, Heading, Text, useBreakpointValue } from '@chakra-ui/react';

export const Header = () => {
  // Use responsive font sizes based on screen size
  const headingSize = useBreakpointValue({ base: "lg", sm: "xl", md: "2xl", lg: "3xl" });
  
  return (
    <section>
      <Box py={{ base: 5, md: 10 }} w="100%" justifyContent="center">
        <Box 
          width={{ base: "90%", md: "80%", lg: 600 }} 
          h={{ base: 200, md: 300 }} 
          bgColor="gray.300" 
          mx="auto" 
          borderRadius={20} 
          mt={{ base: 15, md: 30 }}
        >
          <Text>Carousel?</Text>
        </Box>
      </Box>

      <Box py={{ base: 3, md: 5 }} w="100%" justifyContent="center">
        <Flex 
          direction="row"
          alignItems="center" 
          justifyContent="center" 
          gap={{ base: 3, md: 30 }}
          px={{ base: 4, md: 0 }}
          flexWrap={{ base: "nowrap", md: "nowrap" }}
        >
          <Heading 
            size={headingSize} 
            fontFamily="mono" 
            color="gray.900" 
            textAlign="center"
          >
            REFLECTIONS
          </Heading>
          
          <Box 
            w={1}
            h={{ base: 50, md: 100 }}
            bgColor="gray.500"
          />
          
          <Heading 
            size={headingSize} 
            fontFamily="mono" 
            color="gray.900" 
            textAlign="center"
          >
            PROJECTIONS
          </Heading>
        </Flex>
      </Box>
    </section>
  );
};