import { Box, Container, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import React, { useRef } from 'react'

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

export const Archive = () => {

  const sponsors = [
    "John Deere",
    "Caterpillar", 
    "Motorola",
    "Verkada"
  ]

  const speakersRef = useRef<HTMLDivElement>(null);

  return (
    <Box minH="100vh" py={10}>
      <Container maxW="container.xl">
        <Flex direction={{ base: 'column', md: 'row' }} mb={16} align="center">
          <VStack flex={1} align="flex-start" p={4} spacing={4}>
            <Heading as="h2" size="2xl" fontWeight="bold">
              History
            </Heading>
            <Text fontSize="lg">
              RP is a week-long ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </VStack>
          <Box flex={1} p={4} w="100%">
            <Box 
              w="100%" 
              h="300px" 
              position="relative"
              bg="gray.300"
              borderRadius="md"
              overflow="hidden"
            />
          </Box>
        </Flex>
        <YearContent year={24} />
        <YearContent year={23} />
        <br/>

        <Flex mb={16} align="center" justifyContent="center" p={4} gap={4} flexDirection={{
          base: 'column', 'md': 'row'
        }} ref={speakersRef}>
          <Box
            bgColor={"gray.300"} 
            p={5}
            borderRadius={"50%"}
            width="400px"
            height="300px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={"center"}
            mr={3}
          >
            <Text fontSize={"4xl"} fontWeight={"bold"}>HALL OF </Text>
            <Text fontSize="3xl" fontStyle={"italic"} lineHeight={"6"}>Previous<br/>Speakers </Text>
          </Box>
          <VStack>
            <Flex gap={4} mb={"-80px"} justifyContent={"flex-start"}>
              <SpeakerOval 
                speakersRef={speakersRef}
                speakerName='Speaker 2'
                companyName='Company'
                width={150}
                height={130}
                ml={"100px"}
                horizontal
                delay={0.4}
              />
              <SpeakerOval 
                speakersRef={speakersRef}
                speakerName='Speaker 4'
                companyName='Company'
                width={150}
                height={130}
                delay={0.8}
              />
            </Flex>

            <Flex gap={4}>
              <SpeakerOval 
                speakersRef={speakersRef}
                speakerName='Speaker 1'
                companyName='Company'
                width={150}
                height={130}
                delay={0.2}
              />
              <SpeakerOval 
                speakersRef={speakersRef}
                speakerName='Speaker 3'
                companyName='Company'
                width={180}
                height={150}
                ml={"100px"}
                mt={"20px"}
                delay={0.6}
              />
              <SpeakerOval 
                speakersRef={speakersRef}
                speakerName='Speaker 5'
                companyName='Company'
                width={150}
                height={130}
                mt={20}
                delay={1}
              />
            </Flex>
          </VStack>
        </Flex>



        <br/>

        <VStack p={4}> 
          <VStack w={"100%"} align="flex-start" spacing={4} borderBottom={"1px solid"} borderColor={"gray.500"} pb={3}>
            <Heading as="h2" size="lg" fontWeight="bold" >
              Previous Sponsors
            </Heading>  
          </VStack>
          <Box w="100%" mt={5}>
            <SimpleGrid columns={{ base: 2, sm: 3,  md: 4 }} spacing={5}>
              {sponsors.map((sponsor, index) => (
                <SponsorBox sponsorName={sponsor} delay={index*0.2} />
              ))}
            </SimpleGrid>
          </Box>

        </VStack>

        <br/><br/>
      </Container>

      
    </Box>
  )
}
const YearContent: React.FC<{
  year: number
}> = ({year}) => {
  return <Flex p={4} gap={8} direction={{ base: 'column', md: 'row' }} >
    <Flex direction={"column"}  alignItems={{ base: 'flex-start', md: 'flex-end' }} borderTop={"1px solid"} borderColor={"gray.500"} pt={2} justifyContent={"space-between"} pl={"0px"}>
      <Heading as="h2" size="2xl" fontWeight="bold" h={"40px"}>
        '{year}
      </Heading>
      <Box 
        w="100px" 
        h="100px" 
        position="relative"
        bg="gray.300"
        borderRadius="md"
        mt={{base: '10px', md: '30px'}}
      />
    </Flex>
    <Box w="100%">
      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={5}>
        <ArchiveImageBox/>
        <ArchiveImageBox delay={0.2}/>
        <ArchiveImageBox delay={0.6}/>
        <ArchiveImageBox delay={1}/>
      </SimpleGrid>
    </Box>
  </Flex>
}

const ArchiveImageBox = ({ delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <MotionBox
      ref={ref}
      h="200px" 
      position="relative"
      bg="gray.300"
      borderRadius="md"
      overflow="hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      boxShadow={"1px "}
      transition={{ 
        duration: 0.5,
        delay: delay,
        easings: ['easeInOut']
      }}
    />
  );
};

const SponsorBox: React.FC<{
  sponsorName: string,
  delay: number
}> = ({sponsorName, delay =0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return <VStack alignItems={'flex-start'}>
    <MotionBox 
      ref={ref}
      w={"100%"}
      h="200px" 
      position="relative"
      bgColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      opacity={0.9}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ 
        duration: 0.5,
        delay: delay,
        ease: "easeIn" 
      }}
    />
    <MotionText        
      fontSize="2xl"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ 
        duration: 0.5,
        delay: delay,
        ease: "easeIn" 
      }}
    >
      {sponsorName}
    </MotionText>
  </VStack>
}

const SpeakerOval: React.FC<{
  speakersRef: React.RefObject<HTMLElement>;
  speakerName: string;
  companyName: string;
  width: number;
  height: number;
  delay?: number;
  mt?: number | string;
  ml?: number | string;
  mr?: number | string;
  mb?: number | string;
  horizontal?: boolean;
}> = ({
  speakerName, companyName, width, height, mt, ml, mr, mb, horizontal, delay = 0, speakersRef
}) => {
  const isInView = useInView(speakersRef, { once: true, amount: 0.2 });
  return <MotionFlex 
    flexDirection={horizontal ? 'row' : 'column'} 
    gap={horizontal ? 3 : 0} 
    alignItems={"center"}
    mt={mt}
    ml={ml}
    mr={mr}
    mb={mb}
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
    transition={{ 
      duration: 0.5,
      delay: delay,
      ease: "easeIn" 
    }}
  >
    <Box
      bgColor={"gray.300"} 
      borderRadius={"50%"}
      width={`${width}px`}
      height={`${height}px`}
      minWidth={`${width}px`}
      minHeight={`${height}px`}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
    </Box>
    <VStack gap={0} mt={1} alignItems={"center"} w={"100%"}>
      <Text fontSize={"lg"} fontWeight={"bold"} my={0}>{speakerName}</Text>
      <Text fontSize="sm" fontStyle={"italic"} mt={0}>{companyName}</Text>
    </VStack>
  </MotionFlex>;
}