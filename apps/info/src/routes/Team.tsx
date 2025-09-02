import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Heading,
  SimpleGrid
} from "@chakra-ui/react";

// Profile box component
const ProfileBox = ({
  name,
  top,
  left
}: {
  name: string;
  top: string;
  left: string;
}) => (
  <Box
    position="absolute"
    top={top}
    left={left}
    w="100px"
    h="120px"
    bg="white"
    border="2px solid black"
    borderRadius="md"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-between"
    p={2}
    zIndex={2}
  >
    <Box w="70px" h="70px" bg="gray.300" borderRadius="md" />
    <Text fontSize="xs" fontWeight="medium" textAlign="center">
      {name}
    </Text>
  </Box>
);

const TeamPage = () => {
  return (
    <Box w="100vw" py={8}>
      <VStack spacing={8} align="stretch" maxW="none">
        {/* Header */}
        <VStack spacing={4}>
          <Heading size="2xl" fontWeight="bold">
            2025▼
          </Heading>
          <Heading size="lg" fontWeight="normal">
            Meet the team
          </Heading>
        </VStack>

        {/* Co-Directors Section */}
        <Container maxW="container.lg">
          <VStack spacing={6}>
            <Box bg="gray.200" px={4} py={2} borderRadius="md">
              <Text fontSize="lg" fontWeight="semibold">
                Co - Directors
              </Text>
            </Box>

            <SimpleGrid columns={2} spacing={8}>
              <VStack>
                <Box
                  w="150px"
                  h="150px"
                  border="3px solid black"
                  bg="gray.300"
                />
                <Text fontSize="md">Shreenija</Text>
              </VStack>
              <VStack>
                <Box
                  w="150px"
                  h="150px"
                  border="3px solid black"
                  bg="gray.300"
                />
                <Text fontSize="md">Cole</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>

        {/* Team Sections - Full Width */}
        <VStack spacing={0} align="stretch" w="100%">
          {/* Development Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Development Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              {/* Single row of boxes with proper spacing */}
              <ProfileBox name="" top="40px" left="30px" />
              <ProfileBox name="" top="40px" left="150px" />
              <ProfileBox name="" top="40px" left="270px" />
              <ProfileBox name="" top="40px" left="390px" />
              <ProfileBox name="" top="40px" left="510px" />
              <ProfileBox name="" top="40px" left="630px" />
            </Box>
          </HStack>

          {/* Design Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Design Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              <ProfileBox name="" top="40px" left="50px" />
              <ProfileBox name="" top="40px" left="170px" />
              <ProfileBox name="" top="40px" left="290px" />
              <ProfileBox name="" top="40px" left="410px" />
              <ProfileBox name="" top="40px" left="530px" />
            </Box>
          </HStack>

          {/* Content Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Content Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              <ProfileBox name="" top="40px" left="40px" />
              <ProfileBox name="" top="40px" left="160px" />
              <ProfileBox name="" top="40px" left="280px" />
              <ProfileBox name="" top="40px" left="400px" />
              <ProfileBox name="" top="40px" left="520px" />
              <ProfileBox name="" top="40px" left="640px" />
            </Box>
          </HStack>

          {/* Corporate Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Corporate Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              <ProfileBox name="" top="40px" left="35px" />
              <ProfileBox name="" top="40px" left="155px" />
              <ProfileBox name="" top="40px" left="275px" />
              <ProfileBox name="" top="40px" left="395px" />
              <ProfileBox name="" top="40px" left="515px" />
            </Box>
          </HStack>

          {/* Marketing Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Marketing Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              <ProfileBox name="" top="40px" left="45px" />
              <ProfileBox name="" top="40px" left="165px" />
              <ProfileBox name="" top="40px" left="285px" />
              <ProfileBox name="" top="40px" left="405px" />
              <ProfileBox name="" top="40px" left="525px" />
              <ProfileBox name="" top="40px" left="645px" />
            </Box>
          </HStack>

          {/* Operations Team */}
          <HStack spacing={0} align="stretch" minH="200px" w="100%">
            <Box
              bg="black"
              color="white"
              w="120px"
              display="flex"
              alignItems="center"
              zIndex={1}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Operations Team
              </Text>
            </Box>
            <Box flex="1" position="relative" bg="gray.300">
              <ProfileBox name="" top="40px" left="30px" />
              <ProfileBox name="" top="40px" left="150px" />
              <ProfileBox name="" top="40px" left="270px" />
              <ProfileBox name="" top="40px" left="390px" />
              <ProfileBox name="" top="40px" left="510px" />
            </Box>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default TeamPage;
