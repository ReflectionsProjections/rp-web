import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Divider,
  useBreakpointValue
} from "@chakra-ui/react";

// Profile box component with responsive sizing
const ProfileBox = ({
  name,
  top,
  left,
  mobileTop,
  mobileLeft,
  tabletTop,
  tabletLeft
}: {
  name: string;
  top: string;
  left: string;
  mobileTop?: string;
  mobileLeft?: string;
  tabletTop?: string;
  tabletLeft?: string;
}) => {
  const boxSize = useBreakpointValue({
    base: "140px",
    md: "150px",
    lg: "160px"
  });
  const imageSize = useBreakpointValue({
    base: "80px",
    md: "85px",
    lg: "90px"
  });
  const fontSize = useBreakpointValue({ base: "xs", md: "sm", lg: "sm" });

  const responsiveTop = useBreakpointValue({
    base: mobileTop || top,
    md: tabletTop || top,
    lg: top
  });

  const responsiveLeft = useBreakpointValue({
    base: mobileLeft || left,
    md: tabletLeft || left,
    lg: left
  });

  return (
    <Box
      position="absolute"
      top={responsiveTop}
      left={responsiveLeft}
      w={boxSize}
      h={boxSize}
      bg="white"
      border="3px solid black"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      p={3}
      zIndex={2}
      boxShadow="lg"
    >
      <Box w={imageSize} h={imageSize} bg="gray.300" borderRadius="lg" />
      <Text fontSize={fontSize} fontWeight="medium" textAlign="center">
        {name}
      </Text>
    </Box>
  );
};

const TeamPage = () => {
  const sidebarWidth = useBreakpointValue({
    base: "80px",
    md: "90px",
    lg: "100px"
  });
  const sidebarLeft = useBreakpointValue({
    base: "20px",
    md: "30px",
    lg: "50px"
  });

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

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              <VStack>
                <Box
                  w={{ base: "120px", md: "150px" }}
                  h={{ base: "120px", md: "150px" }}
                  border="3px solid black"
                  bg="gray.300"
                />
                <Text fontSize="md">Shreenija</Text>
              </VStack>
              <VStack>
                <Box
                  w={{ base: "120px", md: "150px" }}
                  h={{ base: "120px", md: "150px" }}
                  border="3px solid black"
                  bg="gray.300"
                />
                <Text fontSize="md">Cole</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>

        {/* Team Sections - Gray Background with Hanging Titles */}
        <Box bg="gray.300" w="100%" position="relative">
          <VStack spacing={0} align="stretch" w="100%">
            {/* Development Team - 12 people */}
            <Box
              minH={{ base: "1200px", md: "800px", lg: "600px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "300px", lg: "450px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Development Team
                </Text>
              </Box>

              {/* Responsive gallery-style scattered layout */}
              <ProfileBox
                name="Ronit Anandani"
                top="40px"
                left="220px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="40px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Aryan Bahl"
                top="80px"
                left="400px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="80px"
                tabletLeft="340px"
              />
              <ProfileBox
                name="Aditya Kshirsagar"
                top="20px"
                left="580px"
                mobileTop="570px"
                mobileLeft="30px"
                tabletTop="20px"
                tabletLeft="500px"
              />
              <ProfileBox
                name="Dev Patel"
                top="120px"
                left="750px"
                mobileTop="730px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Jacob Edley"
                top="220px"
                left="180px"
                mobileTop="890px"
                mobileLeft="30px"
                tabletTop="240px"
                tabletLeft="340px"
              />
              <ProfileBox
                name="Miguel Aenlle"
                top="180px"
                left="360px"
                mobileTop="1050px"
                mobileLeft="30px"
                tabletTop="180px"
                tabletLeft="500px"
              />
              <ProfileBox
                name="Nathan Wang"
                top="240px"
                left="520px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="360px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Quinten Schafer"
                top="280px"
                left="700px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="400px"
                tabletLeft="340px"
              />
              <ProfileBox
                name="Ritam Nandi"
                top="380px"
                left="240px"
                mobileTop="570px"
                mobileLeft="200px"
                tabletTop="360px"
                tabletLeft="500px"
              />
              <ProfileBox
                name="Siri Nallamothu"
                top="420px"
                left="420px"
                mobileTop="730px"
                mobileLeft="200px"
                tabletTop="520px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Timothy Gonzalez"
                top="360px"
                left="600px"
                mobileTop="890px"
                mobileLeft="200px"
                tabletTop="560px"
                tabletLeft="340px"
              />
              <ProfileBox
                name="Vani Ramesh"
                top="400px"
                left="780px"
                mobileTop="1050px"
                mobileLeft="200px"
                tabletTop="520px"
                tabletLeft="500px"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Design Team - 7 people */}
            <Box
              minH={{ base: "900px", md: "600px", lg: "450px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "300px", lg: "400px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Design Team
                </Text>
              </Box>

              <ProfileBox
                name="Aashna Mauskar"
                top="60px"
                left="280px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="60px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Lily Ge"
                top="30px"
                left="480px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="30px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Hua Tong"
                top="90px"
                left="650px"
                mobileTop="570px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Leqi Huang"
                top="220px"
                left="200px"
                mobileTop="730px"
                mobileLeft="30px"
                tabletTop="240px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Pari Shah"
                top="260px"
                left="420px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="360px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Ritsika Medury"
                top="180px"
                left="600px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="400px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Sada Challa"
                top="320px"
                left="760px"
                mobileTop="570px"
                mobileLeft="200px"
                tabletTop="180px"
                tabletLeft="560px"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Content Team - 9 people */}
            <Box
              minH={{ base: "1050px", md: "700px", lg: "500px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "350px", lg: "450px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Content Team
                </Text>
              </Box>

              <ProfileBox
                name="Rohan Nunugonda"
                top="40px"
                left="320px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="40px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Lucy Wu"
                top="80px"
                left="520px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="80px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Amey Gupta"
                top="20px"
                left="720px"
                mobileTop="570px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Anushree Atmakuri"
                top="200px"
                left="240px"
                mobileTop="730px"
                mobileLeft="30px"
                tabletTop="240px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Apoorva Sannasi"
                top="240px"
                left="460px"
                mobileTop="890px"
                mobileLeft="30px"
                tabletTop="360px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Carol Yin"
                top="180px"
                left="680px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="400px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Maya Ajit"
                top="360px"
                left="300px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="180px"
                tabletLeft="560px"
              />
              <ProfileBox
                name="Rini Khandelwal"
                top="380px"
                left="500px"
                mobileTop="570px"
                mobileLeft="200px"
                tabletTop="520px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Rohan Kumar"
                top="340px"
                left="700px"
                mobileTop="730px"
                mobileLeft="200px"
                tabletTop="560px"
                tabletLeft="380px"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Corporate Team - 4 people */}
            <Box
              minH={{ base: "600px", md: "400px", lg: "350px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "250px", lg: "300px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Corporate Team
                </Text>
              </Box>

              <ProfileBox
                name="Kaavya Mahajan"
                top="50px"
                left="380px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="50px"
                tabletLeft="280px"
              />
              <ProfileBox
                name="Shreya Jangada"
                top="120px"
                left="260px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Shahanaasree Sivakumar"
                top="140px"
                left="580px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="240px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Shreya Gosavi"
                top="220px"
                left="440px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="120px"
                tabletLeft="480px"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Marketing Team - 6 people */}
            <Box
              minH={{ base: "750px", md: "500px", lg: "420px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "300px", lg: "370px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Marketing Team
                </Text>
              </Box>

              <ProfileBox
                name="Savannah Lau"
                top="60px"
                left="300px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="60px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Atharva Sindwani"
                top="40px"
                left="540px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="40px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Angelina Deol"
                top="200px"
                left="220px"
                mobileTop="570px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Jenica Jeevan"
                top="180px"
                left="480px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="240px"
                tabletLeft="400px"
              />
              <ProfileBox
                name="Mahnoor Aetzaz"
                top="260px"
                left="360px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="360px"
                tabletLeft="200px"
              />
              <ProfileBox
                name="Yash Jagtap"
                top="320px"
                left="620px"
                mobileTop="570px"
                mobileLeft="200px"
                tabletTop="180px"
                tabletLeft="560px"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Operations Team - 5 people */}
            <Box
              minH={{ base: "650px", md: "450px", lg: "380px" }}
              w="100%"
              position="relative"
            >
              <Box
                position="absolute"
                bg="black"
                color="white"
                left={sidebarLeft}
                top="0"
                w={sidebarWidth}
                h={{ base: "200px", md: "280px", lg: "330px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={1}
              >
                <Text
                  transform="rotate(-90deg)"
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="semibold"
                  textAlign="center"
                  whiteSpace="nowrap"
                >
                  Operations Team
                </Text>
              </Box>

              <ProfileBox
                name="Rishit Chatterjee"
                top="80px"
                left="420px"
                mobileTop="250px"
                mobileLeft="30px"
                tabletTop="80px"
                tabletLeft="320px"
              />
              <ProfileBox
                name="Ranjana Rajagopalan"
                top="40px"
                left="280px"
                mobileTop="410px"
                mobileLeft="30px"
                tabletTop="40px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Hazel Lu"
                top="120px"
                left="600px"
                mobileTop="570px"
                mobileLeft="30px"
                tabletTop="200px"
                tabletLeft="180px"
              />
              <ProfileBox
                name="Madhav Agrawal"
                top="240px"
                left="340px"
                mobileTop="250px"
                mobileLeft="200px"
                tabletTop="240px"
                tabletLeft="380px"
              />
              <ProfileBox
                name="Vidipta Roy"
                top="200px"
                left="560px"
                mobileTop="410px"
                mobileLeft="200px"
                tabletTop="120px"
                tabletLeft="500px"
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeamPage;
