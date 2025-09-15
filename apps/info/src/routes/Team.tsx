import { useEffect } from "react";
import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Divider,
  useBreakpointValue,
  Image,
  Flex,
  Wrap,
  WrapItem,
  Stack
} from "@chakra-ui/react";

const TeamSidebar = ({ teamName }: { teamName: string }) => {
  const sidebarWidth = useBreakpointValue({
    base: "0px",
    md: "70px",
    lg: "80px"
  });
  const sidebarLeft = useBreakpointValue({
    base: "0px",
    md: "20px",
    lg: "50px"
  });
  const showSidebar = useBreakpointValue({ base: false, md: true });

  if (!showSidebar) return null;

  return (
    <Box
      position="absolute"
      bg="black"
      color="white"
      left={sidebarLeft}
      top="0"
      w={sidebarWidth}
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
    >
      <Text
        transform="rotate(-90deg)"
        fontSize={{ base: "xs", md: "sm", lg: "md" }}
        fontWeight="semibold"
        textAlign="center"
        whiteSpace="nowrap"
      >
        {teamName}
      </Text>
    </Box>
  );
};

const TeamHeader = ({ teamName }: { teamName: string }) => {
  const showHeader = useBreakpointValue({ base: true, md: false });

  if (!showHeader) return null;

  return (
    <Box bg="black" color="white" py={2} mb={4} textAlign="center">
      <Text fontSize="lg" fontWeight="semibold">
        {teamName}
      </Text>
    </Box>
  );
};

const ProfileBox = ({
  name,
  imagePath,
  isLead = false
}: {
  name: string;
  imagePath: string;
  isLead?: boolean;
}) => {
  const boxSize = useBreakpointValue({
    base: "120px",
    md: "140px",
    lg: "160px"
  });

  const imageSize = useBreakpointValue({
    base: isLead ? "100px" : "80px",
    md: isLead ? "120px" : "90px",
    lg: isLead ? "140px" : "100px"
  });

  const leadBoxSize = useBreakpointValue({
    base: "140px",
    md: "160px",
    lg: "180px"
  });

  const fontSize = useBreakpointValue({
    base: "xs",
    md: isLead ? "sm" : "xs",
    lg: isLead ? "md" : "sm"
  });

  return (
    <Box
      w={isLead ? leadBoxSize : boxSize}
      h={isLead ? leadBoxSize : boxSize}
      bg="white"
      border={isLead ? "8px double black" : "3px solid black"}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      zIndex={2}
      boxShadow={isLead ? "xl" : "lg"}
      m={2}
    >
      <Image
        src={imagePath}
        alt={name}
        w={imageSize}
        h={imageSize}
        borderRadius="lg"
        objectFit="cover"
      />
      <Text
        fontSize={fontSize}
        fontWeight={isLead ? "bold" : "medium"}
        textAlign="center"
        lineHeight="1.2"
      >
        {name}
      </Text>
    </Box>
  );
};

const TeamPage = () => {
  const sidebarOffset = useBreakpointValue({
    base: "0px",
    md: "100px",
    lg: "140px"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box w="100vw" py={8}>
      <VStack spacing={8} align="stretch" maxW="none">
        <Box as="section" w="100%" pt={{ base: "80px", md: "100px" }}>
          <Container maxW="container.xl">
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={{ base: "center", lg: "center" }}
              justify="center"
              spacing={{ base: 10, md: 16 }}
              textAlign={{ base: "center", lg: "left" }}
            >
              <VStack
                spacing={3}
                align={{ base: "center", lg: "flex-start" }}
                flexShrink={0}
              >
                <Heading size="3xl" fontWeight="bold">
                  2025
                </Heading>
                <Heading size="xl" fontWeight="normal">
                  Meet the team
                </Heading>
              </VStack>

              <Box position="relative" w="full" maxW={{ base: "sm", md: "lg" }}>
                <Box
                  position="absolute"
                  top={{ base: "-12px" }}
                  left="50%"
                  transform="translateX(-50%)"
                  bg="black"
                  color="white"
                  px={{ base: 4, md: 6 }}
                  py={{ base: 1.5, md: 2 }}
                  textAlign={"center"}
                >
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="semibold"
                  >
                    Co-Directors
                  </Text>
                </Box>

                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  spacing={{ base: 6, md: 8 }}
                  alignItems="center"
                  justifyItems="center"
                  bg="white"
                  p={{ base: 4, md: 6 }}
                  pt={{ base: 8, md: 10 }}
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <VStack spacing={3}>
                    <Image
                      src="/Directors/Shreenija.JPG"
                      alt="Shreenija"
                      w={{ base: "160px", md: "180px" }}
                      h={{ base: "160px", md: "180px" }}
                      border="3px solid"
                      borderColor="black"
                      objectFit="cover"
                    />
                    <Text fontSize="md">Shreenija</Text>
                  </VStack>

                  <VStack spacing={3}>
                    <Image
                      src="/Directors/Cole.JPG"
                      alt="Cole"
                      w={{ base: "160px", md: "180px" }}
                      h={{ base: "160px", md: "180px" }}
                      border="3px solid"
                      borderColor="black"
                      objectFit="cover"
                    />
                    <Text fontSize="md">Cole</Text>
                  </VStack>
                </SimpleGrid>
              </Box>
            </Stack>
          </Container>
        </Box>

        <Box bg="gray.300" w="100%" position="relative">
          <VStack spacing={0} align="stretch" w="100%">
            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Development Team" />
              <TeamHeader teamName="Development Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Ronit Anandani"
                      imagePath="/Dev/Ronit.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Aryan Bahl"
                      imagePath="/Dev/Aryan.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Box>
                    <Wrap justify="center" spacing={4} mb={4}>
                      <WrapItem>
                        <ProfileBox
                          name="Aditya Kshirsagar"
                          imagePath="/Dev/Aditya.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Dev Patel"
                          imagePath="/Dev/Dev.jpeg"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Jacob Edley"
                          imagePath="/Dev/Jacob.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Miguel Aenlle"
                          imagePath="/Dev/Miguel.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Nathan Wang"
                          imagePath="/Dev/Nathan.JPG"
                        />
                      </WrapItem>
                    </Wrap>

                    <Wrap justify="center" spacing={4}>
                      <WrapItem>
                        <ProfileBox
                          name="Quinten Schafer"
                          imagePath="/Dev/Quinten 2.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Ritam Nandi"
                          imagePath="/Dev/Ritam.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Siri Nallamothu"
                          imagePath="/Dev/Siri.png"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Timothy Gonzalez"
                          imagePath="/Dev/Timothy.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Vani Ramesh"
                          imagePath="/Dev/Vani.JPG"
                        />
                      </WrapItem>
                    </Wrap>
                  </Box>
                </VStack>
              </Box>
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Design Team" />
              <TeamHeader teamName="Design Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Aashna Mauskar"
                      imagePath="/Design/Aashna.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Lily Ge"
                      imagePath="/Design/Lily.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Wrap justify="center" spacing={4}>
                    <WrapItem>
                      <ProfileBox name="Hua Tong" imagePath="/Design/Hua.JPG" />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Leqi Huang"
                        imagePath="/Design/Leqi.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Pari Shah"
                        imagePath="/Design/Pari.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Ritsika Medury"
                        imagePath="/Design/Ritsika.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Sada Challa"
                        imagePath="/Design/Sada.JPG"
                      />
                    </WrapItem>
                  </Wrap>
                </VStack>
              </Box>
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Content Team" />
              <TeamHeader teamName="Content Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Rohan Nunugonda"
                      imagePath="/Content/Rohan N.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Lucy Wu"
                      imagePath="/Content/Lucy.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Box>
                    <Wrap justify="center" spacing={4} mb={4}>
                      <WrapItem>
                        <ProfileBox
                          name="Amey Gupta"
                          imagePath="/Content/Amey.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Anushree Atmakuri"
                          imagePath="/Content/Anushree.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Apoorva Sannasi"
                          imagePath="/Content/Apoorva.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Carol Yin"
                          imagePath="/Content/Carol.JPG"
                        />
                      </WrapItem>
                    </Wrap>

                    <Wrap justify="center" spacing={4}>
                      <WrapItem>
                        <ProfileBox
                          name="Maya Ajit"
                          imagePath="/Content/Maya.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Rini Khandelwal"
                          imagePath="/Content/Rini.JPG"
                        />
                      </WrapItem>
                      <WrapItem>
                        <ProfileBox
                          name="Rohan Kumar"
                          imagePath="/Content/Rohan K.JPG"
                        />
                      </WrapItem>
                    </Wrap>
                  </Box>
                </VStack>
              </Box>
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Corporate Team" />
              <TeamHeader teamName="Corporate Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Kaavya Mahajan"
                      imagePath="/Corporate/Kaavya.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Shreya Jangada"
                      imagePath="/Corporate/Shreya J.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Wrap justify="center" spacing={4}>
                    <WrapItem>
                      <ProfileBox
                        name="Shahanaasree Sivakumar"
                        imagePath="/Corporate/Shahanaa.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Shreya Gosavi"
                        imagePath="/Corporate/Shreya G.JPG"
                      />
                    </WrapItem>
                  </Wrap>
                </VStack>
              </Box>
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Marketing Team" />
              <TeamHeader teamName="Marketing Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Savannah Lau"
                      imagePath="/Marketing/Savannah.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Atharva Sindwani"
                      imagePath="/Marketing/Atharva.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Wrap justify="center" spacing={4}>
                    <WrapItem>
                      <ProfileBox
                        name="Angelina Deol"
                        imagePath="/Marketing/Angelina.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Jenica Jeevan"
                        imagePath="/Marketing/Jenica.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Mahnoor Aetzaz"
                        imagePath="/Marketing/Mahnoor.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Yash Jagtap"
                        imagePath="/Marketing/Yash.png"
                      />
                    </WrapItem>
                  </Wrap>
                </VStack>
              </Box>
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            <Box
              w="100%"
              position="relative"
              overflow="hidden"
              py={6}
              minH="fit-content"
            >
              <TeamSidebar teamName="Operations Team" />
              <TeamHeader teamName="Operations Team" />

              <Box ml={sidebarOffset} mr={4} px={{ base: 4, md: 0 }}>
                <VStack spacing={6}>
                  <Flex justify="center" wrap="wrap" gap={4}>
                    <ProfileBox
                      name="Rishit Chatterjee"
                      imagePath="/Ops/Rishit 1.JPG"
                      isLead={true}
                    />
                    <ProfileBox
                      name="Ranjana Rajagopalan"
                      imagePath="/Ops/Ranjana.JPG"
                      isLead={true}
                    />
                  </Flex>

                  <Wrap justify="center" spacing={4}>
                    <WrapItem>
                      <ProfileBox name="Hazel Lu" imagePath="/Ops/Hazel.JPG" />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Madhav Agrawal"
                        imagePath="/Ops/Madhav.JPG"
                      />
                    </WrapItem>
                    <WrapItem>
                      <ProfileBox
                        name="Vidipta Roy"
                        imagePath="/Ops/Vidipta.JPG"
                      />
                    </WrapItem>
                  </Wrap>
                </VStack>
              </Box>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeamPage;
