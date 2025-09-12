import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Divider,
  useBreakpointValue,
  Image
} from "@chakra-ui/react";

// Reusable team sidebar component
const TeamSidebar = ({ teamName }: { teamName: string }) => {
  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: "70px",
    lg: "80px"
  });
  const sidebarLeft = useBreakpointValue({
    base: "10px",
    md: "20px",
    lg: "50px"
  });
  const sidebarHeight = useBreakpointValue({
    base: "160px",
    md: "200px",
    lg: "250px"
  });

  return (
    <Box
      position="absolute"
      bg="black"
      color="white"
      left={sidebarLeft}
      top="0"
      w={sidebarWidth}
      h={sidebarHeight}
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

// Profile box component with responsive sizing
const ProfileBox = ({
  name,
  imagePath,
  top,
  left,
  mobileTop,
  mobileLeft,
  tabletTop,
  tabletLeft,
  isLead = false
}: {
  name: string;
  imagePath: string;
  top: string;
  left: string;
  mobileTop?: string;
  mobileLeft?: string;
  tabletTop?: string;
  tabletLeft?: string;
  isLead?: boolean;
}) => {
  const boxSize = useBreakpointValue({
    base: "120px",
    md: "140px",
    lg: "160px"
  });

  // Bigger images for leads (chairs)
  const imageSize = useBreakpointValue({
    base: isLead ? "140px" : "100px",
    md: isLead ? "160px" : "110px",
    lg: isLead ? "180px" : "120px"
  });

  // Bigger boxes for leads
  const leadBoxSize = useBreakpointValue({
    base: "160px",
    md: "180px",
    lg: "200px"
  });

  const fontSize = useBreakpointValue({ base: "xs", md: "xs", lg: "sm" });

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
      w={isLead ? leadBoxSize : boxSize}
      h={isLead ? leadBoxSize : boxSize}
      bg="white"
      border={isLead ? "10px double black" : "3px solid black"}
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      zIndex={2}
      boxShadow={isLead ? "xl" : "lg"}
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
                <Image
                  src="/Directors/Shreenija.JPG"
                  alt="Shreenija"
                  w={{ base: "120px", md: "150px" }}
                  h={{ base: "120px", md: "150px" }}
                  border="3px solid black"
                  objectFit="cover"
                />
                <Text fontSize="md">Shreenija</Text>
              </VStack>
              <VStack>
                <Image
                  src="/Directors/Cole.JPG"
                  alt="Cole"
                  w={{ base: "120px", md: "150px" }}
                  h={{ base: "120px", md: "150px" }}
                  border="3px solid black"
                  objectFit="cover"
                />
                <Text fontSize="md">Cole</Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>

        {/* Team Sections - Gray Background with Hanging Titles */}
        <Box bg="gray.300" w="100%" position="relative">
          <VStack spacing={0} align="stretch" w="100%">
            {/* Development Team - 12 people (2 leads + 10 members in 5-5 layout) */}
            <Box
              minH={{ base: "1200px", md: "800px", lg: "650px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Development Team" />

              {/* Row 1 - Committee Leads (2 people) - adjusted for bigger boxes */}
              <ProfileBox
                name="Ronit Anandani"
                imagePath="/Dev/Ronit.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Aryan Bahl"
                imagePath="/Dev/Aryan.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 5 people */}
              <ProfileBox
                name="Aditya Kshirsagar"
                imagePath="/Dev/Aditya.JPG"
                top="250px"
                left="15%"
                mobileTop="200px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="15%"
              />
              <ProfileBox
                name="Dev Patel"
                imagePath="/Dev/Dev.jpeg"
                top="250px"
                left="30%"
                mobileTop="200px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="30%"
              />
              <ProfileBox
                name="Jacob Edley"
                imagePath="/Dev/Jacob.JPG"
                top="250px"
                left="45%"
                mobileTop="340px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="45%"
              />
              <ProfileBox
                name="Miguel Aenlle"
                imagePath="/Dev/Miguel.JPG"
                top="250px"
                left="60%"
                mobileTop="340px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="60%"
              />
              <ProfileBox
                name="Nathan Wang"
                imagePath="/Dev/Nathan.JPG"
                top="250px"
                left="75%"
                mobileTop="480px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="75%"
              />

              {/* Row 3 - 5 people */}
              <ProfileBox
                name="Quinten Schafer"
                imagePath="/Dev/Quinten 2.JPG"
                top="420px"
                left="15%"
                mobileTop="480px"
                mobileLeft="55%"
                tabletTop="400px"
                tabletLeft="15%"
              />
              <ProfileBox
                name="Ritam Nandi"
                imagePath="/Dev/Ritam.JPG"
                top="420px"
                left="30%"
                mobileTop="620px"
                mobileLeft="5%"
                tabletTop="400px"
                tabletLeft="30%"
              />
              <ProfileBox
                name="Siri Nallamothu"
                imagePath="/team/siri.jpg"
                top="420px"
                left="45%"
                mobileTop="620px"
                mobileLeft="55%"
                tabletTop="400px"
                tabletLeft="45%"
              />
              <ProfileBox
                name="Timothy Gonzalez"
                imagePath="/Dev/Timothy.JPG"
                top="420px"
                left="60%"
                mobileTop="760px"
                mobileLeft="5%"
                tabletTop="400px"
                tabletLeft="60%"
              />
              <ProfileBox
                name="Vani Ramesh"
                imagePath="/Dev/Vani.JPG"
                top="420px"
                left="75%"
                mobileTop="760px"
                mobileLeft="55%"
                tabletTop="400px"
                tabletLeft="75%"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Design Team - 7 people (2 leads + 5 members in 3-2 layout) */}
            <Box
              minH={{ base: "900px", md: "700px", lg: "600px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Design Team" />

              {/* Row 1 - Committee Leads (2 people) */}
              <ProfileBox
                name="Aashna Mauskar"
                imagePath="/Design/Aashna.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Lily Ge"
                imagePath="/Design/Lily.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 3 people */}
              <ProfileBox
                name="Hua Tong"
                imagePath="/Design/Hua.JPG"
                top="250px"
                left="25%"
                mobileTop="200px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="25%"
              />
              <ProfileBox
                name="Leqi Huang"
                imagePath="/Design/Leqi.JPG"
                top="250px"
                left="45%"
                mobileTop="200px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="45%"
              />
              <ProfileBox
                name="Pari Shah"
                imagePath="/Design/Pari.JPG"
                top="250px"
                left="65%"
                mobileTop="340px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="65%"
              />

              {/* Row 3 - 2 people (centered) */}
              <ProfileBox
                name="Ritsika Medury"
                imagePath="/Design/Ritsika.JPG"
                top="420px"
                left="35%"
                mobileTop="340px"
                mobileLeft="55%"
                tabletTop="400px"
                tabletLeft="35%"
              />
              <ProfileBox
                name="Sada Challa"
                imagePath="/Design/Sada.JPG"
                top="420px"
                left="55%"
                mobileTop="480px"
                mobileLeft="30%"
                tabletTop="400px"
                tabletLeft="55%"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Content Team - 9 people (2 leads + 7 members in 4-3 layout) */}
            <Box
              minH={{ base: "900px", md: "650px", lg: "630px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Content Team" />

              {/* Row 1 - Committee Leads (2 people) */}
              <ProfileBox
                name="Rohan Nunugonda"
                imagePath="/Content/Rohan N.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Lucy Wu"
                imagePath="/Content/Lucy.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 4 people */}
              <ProfileBox
                name="Amey Gupta"
                imagePath="/Content/Amey.JPG"
                top="250px"
                left="20%"
                mobileTop="200px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="20%"
              />
              <ProfileBox
                name="Anushree Atmakuri"
                imagePath="/Content/Anushree.JPG"
                top="250px"
                left="36%"
                mobileTop="200px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="36%"
              />
              <ProfileBox
                name="Apoorva Sannasi"
                imagePath="/Content/Apoorva.JPG"
                top="250px"
                left="52%"
                mobileTop="340px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="52%"
              />
              <ProfileBox
                name="Carol Yin"
                imagePath="/Content/Carol.JPG"
                top="250px"
                left="68%"
                mobileTop="340px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="68%"
              />

              {/* Row 3 - 3 people (centered) */}
              <ProfileBox
                name="Maya Ajit"
                imagePath="/Content/Maya.JPG"
                top="420px"
                left="30%"
                mobileTop="480px"
                mobileLeft="5%"
                tabletTop="400px"
                tabletLeft="30%"
              />
              <ProfileBox
                name="Rini Khandelwal"
                imagePath="/Content/Rini.JPG"
                top="420px"
                left="45%"
                mobileTop="480px"
                mobileLeft="55%"
                tabletTop="400px"
                tabletLeft="45%"
              />
              <ProfileBox
                name="Rohan Kumar"
                imagePath="/Content/Rohan K.JPG"
                top="420px"
                left="60%"
                mobileTop="620px"
                mobileLeft="30%"
                tabletTop="400px"
                tabletLeft="60%"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Corporate Team - 4 people (2 leads + 2 members) */}
            <Box
              minH={{ base: "550px", md: "500px", lg: "450px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Corporate Team" />

              {/* Row 1 - Committee Leads (2 people) */}
              <ProfileBox
                name="Kaavya Mahajan"
                imagePath="/Corporate/Kaavya.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Shreya Jangada"
                imagePath="/Corporate/Shreya J.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 2 members */}
              <ProfileBox
                name="Shahanaasree Sivakumar"
                imagePath="/Corporate/Shahanaa.JPG"
                top="250px"
                left="35%"
                mobileTop="200px"
                mobileLeft="15%"
                tabletTop="230px"
                tabletLeft="35%"
              />
              <ProfileBox
                name="Shreya Gosavi"
                imagePath="/Corporate/Shreya G.JPG"
                top="250px"
                left="55%"
                mobileTop="200px"
                mobileLeft="65%"
                tabletTop="230px"
                tabletLeft="55%"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Marketing Team - 6 people (2 leads + 4 members in single row) */}
            <Box
              minH={{ base: "620px", md: "500px", lg: "450px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Marketing Team" />

              {/* Row 1 - Committee Leads (2 people) */}
              <ProfileBox
                name="Savannah Lau"
                imagePath="/Marketing/Savannah.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Atharva Sindwani"
                imagePath="/Marketing/Atharva.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 4 people in one row */}
              <ProfileBox
                name="Angelina Deol"
                imagePath="/Marketing/Angelina.JPG"
                top="250px"
                left="20%"
                mobileTop="200px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="20%"
              />
              <ProfileBox
                name="Jenica Jeevan"
                imagePath="/Marketing/Jenica.JPG"
                top="250px"
                left="36%"
                mobileTop="200px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="36%"
              />
              <ProfileBox
                name="Mahnoor Aetzaz"
                imagePath="/Marketing/Mahnoor.JPG"
                top="250px"
                left="52%"
                mobileTop="340px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="52%"
              />
              <ProfileBox
                name="Yash Jagtap"
                imagePath="/team/yash.jpg"
                top="250px"
                left="68%"
                mobileTop="340px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="68%"
              />
            </Box>

            <Divider borderColor="black" borderBottomWidth="4px" />

            {/* Operations Team - 5 people (2 leads + 3 members in single row) */}
            <Box
              minH={{ base: "620px", md: "500px", lg: "450px" }}
              w="100%"
              position="relative"
              overflow="hidden"
            >
              <TeamSidebar teamName="Operations Team" />

              {/* Row 1 - Committee Leads (2 people) */}
              <ProfileBox
                name="Rishit Chatterjee"
                imagePath="/Ops/Rishit 1.JPG"
                top="30px"
                left="32%"
                mobileTop="20px"
                mobileLeft="10%"
                tabletTop="30px"
                tabletLeft="32%"
                isLead={true}
              />
              <ProfileBox
                name="Ranjana Rajagopalan"
                imagePath="/Ops/Ranjana.JPG"
                top="30px"
                left="58%"
                mobileTop="20px"
                mobileLeft="60%"
                tabletTop="30px"
                tabletLeft="58%"
                isLead={true}
              />

              {/* Row 2 - 3 members (centered) */}
              <ProfileBox
                name="Hazel Lu"
                imagePath="/Ops/Hazel.JPG"
                top="250px"
                left="28%"
                mobileTop="200px"
                mobileLeft="5%"
                tabletTop="230px"
                tabletLeft="28%"
              />
              <ProfileBox
                name="Madhav Agrawal"
                imagePath="/Ops/Madhav.JPG"
                top="250px"
                left="45%"
                mobileTop="200px"
                mobileLeft="55%"
                tabletTop="230px"
                tabletLeft="45%"
              />
              <ProfileBox
                name="Vidipta Roy"
                imagePath="/Ops/Vidipta.JPG"
                top="250px"
                left="62%"
                mobileTop="340px"
                mobileLeft="30%"
                tabletTop="230px"
                tabletLeft="62%"
              />
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default TeamPage;
