import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  useBreakpointValue,
  Divider,
  Flex
} from "@chakra-ui/react";

const TeamPage: React.FC = () => {
  const sidebarWidth = useBreakpointValue({
    base: "60px",
    md: "80px",
    lg: "120px"
  });
  const headingSize = useBreakpointValue({
    base: "lg",
    md: "xl",
    lg: "2xl",
    xl: "3xl"
  });
  const spacing = useBreakpointValue({ base: 3, md: 4, lg: 6, xl: 8 });

  const blankImage =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

  const TeamSection: React.FC<{
    title: string;
    children: React.ReactNode;
    sectionBg?: string;
  }> = ({ title, children, sectionBg = "white" }) => (
    <Box py={spacing} bg={sectionBg}>
      <Flex direction={{ base: "column", md: "row" }} align="flex-start">
        <Box
          bg="black"
          color="white"
          width={{ base: "100%", md: sidebarWidth }}
          height={{ base: "50px", md: "auto" }}
          minHeight={{ base: "auto", md: "500px" }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position={{ base: "static", md: "sticky" }}
          top={{ base: "auto", md: 0 }}
          zIndex={1}
          mb={{ base: spacing, md: 0 }}
        >
          <Text
            transform={{ base: "none", md: "rotate(-90deg)" }}
            whiteSpace="nowrap"
            fontSize={{ base: "md", md: "sm", lg: "md" }}
            fontWeight="medium"
            letterSpacing="wider"
            textAlign="center"
          >
            {title}
          </Text>
        </Box>

        <Box
          flex={1}
          px={{ base: 3, md: spacing }}
          display="flex"
          justifyContent="center"
          alignItems="flex-start"
          width="100%"
        >
          {children}
        </Box>
      </Flex>
    </Box>
  );

  const ImageBox: React.FC<{
    width: string;
    height: string;
    isHighlighted?: boolean;
    mobileWidth?: string;
    mobileHeight?: string;
  }> = ({
    width,
    height,
    isHighlighted = false,
    mobileWidth,
    mobileHeight
  }) => (
    <Box
      bg="gray.200"
      width={{
        base: mobileWidth || `${Math.round(parseInt(width) * 0.6)}px`,
        md: width
      }}
      height={{
        base: mobileHeight || `${Math.round(parseInt(height) * 0.6)}px`,
        md: height
      }}
      borderRadius="md"
      overflow="hidden"
      border={isHighlighted ? "4px solid blue.500" : "none"}
      display="inline-block"
      flexShrink={0}
    >
      <Image
        src={blankImage}
        alt="Team member"
        width="100%"
        height="100%"
        objectFit="cover"
        bg="gray.200"
      />
    </Box>
  );

  return (
    <Box minHeight="100vh" bg="gray.50">
      <Container maxW="container.xl" py={spacing} px={{ base: 4, md: 6 }}>
        <VStack spacing={spacing} align="center">
          <Heading
            size={headingSize}
            color="black"
            fontWeight="bold"
            textAlign="center"
          >
            2025
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            color="gray.700"
            textAlign="center"
          >
            Meet the team
          </Text>

          <VStack spacing={spacing} py={spacing}>
            <Heading
              size={{ base: "sm", md: "md" }}
              color="gray.600"
              textDecoration="underline"
              textAlign="center"
            >
              Co - Directors
            </Heading>
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={spacing}
              justify="center"
              align="center"
            >
              <VStack>
                <Box
                  width={{ base: "140px", md: "180px", lg: "225px" }}
                  height={{ base: "140px", md: "180px", lg: "225px" }}
                  bg="gray.200"
                  borderRadius="md"
                  overflow="hidden"
                  border="2px solid gray.300"
                >
                  <Image
                    src={blankImage}
                    alt="Shreenija"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                  Shreenija
                </Text>
              </VStack>
              <VStack>
                <Box
                  width={{ base: "140px", md: "180px", lg: "225px" }}
                  height={{ base: "140px", md: "180px", lg: "225px" }}
                  bg="gray.200"
                  borderRadius="md"
                  overflow="hidden"
                  border="2px solid gray.300"
                >
                  <Image
                    src={blankImage}
                    alt="Cole"
                    width="100%"
                    height="100%"
                    objectFit="cover"
                  />
                </Box>
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium">
                  Cole
                </Text>
              </VStack>
            </Flex>
          </VStack>
        </VStack>
      </Container>

      <Divider borderColor="gray.300" />

      <TeamSection title="Development Team">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="180px" height="120px" />
            <ImageBox width="210px" height="150px" />
            <ImageBox width="150px" height="165px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="165px" height="135px" />
            <ImageBox width="180px" height="150px" />
            <ImageBox width="135px" height="180px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="150px" height="180px" />
            <ImageBox width="195px" height="142px" />
            <ImageBox width="127px" height="172px" />
          </Flex>
        </VStack>
      </TeamSection>

      <Divider borderColor="gray.300" />

      <TeamSection title="Design Team" sectionBg="blue.50">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="135px" height="135px" isHighlighted />
            <ImageBox width="165px" height="105px" />
            <ImageBox width="195px" height="150px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="180px" height="165px" />
            <ImageBox width="150px" height="127px" />
            <ImageBox width="120px" height="180px" />
            <ImageBox width="165px" height="142px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="127px" height="150px" />
            <ImageBox width="187px" height="112px" />
            <ImageBox width="157px" height="172px" />
            <ImageBox width="142px" height="135px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="210px" height="127px" />
            <ImageBox width="135px" height="157px" />
          </Flex>
        </VStack>
      </TeamSection>

      <Divider borderColor="gray.300" />

      <TeamSection title="Content Team">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="150px" height="142px" />
            <ImageBox width="210px" height="165px" />
            <ImageBox width="135px" height="150px" />
            <ImageBox width="180px" height="112px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="127px" height="180px" />
            <ImageBox width="187px" height="127px" />
            <ImageBox width="142px" height="172px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="165px" height="157px" />
            <ImageBox width="120px" height="195px" />
            <ImageBox width="150px" height="165px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="202px" height="142px" />
            <ImageBox width="157px" height="127px" />
          </Flex>
        </VStack>
      </TeamSection>

      <Divider borderColor="gray.300" />

      <TeamSection title="Corporate Team">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="165px" height="165px" />
            <ImageBox width="142px" height="127px" />
            <ImageBox width="187px" height="180px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="150px" height="112px" />
            <ImageBox width="135px" height="157px" />
            <ImageBox width="210px" height="135px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="127px" height="172px" />
            <ImageBox width="180px" height="142px" />
            <ImageBox width="195px" height="165px" />
          </Flex>
        </VStack>
      </TeamSection>

      <Divider borderColor="gray.300" />

      <TeamSection title="Marketing Team">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="195px" height="150px" />
            <ImageBox width="135px" height="180px" />
            <ImageBox width="172px" height="127px" />
            <ImageBox width="157px" height="165px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="127px" height="142px" />
            <ImageBox width="187px" height="172px" />
            <ImageBox width="150px" height="120px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="165px" height="187px" />
            <ImageBox width="142px" height="135px" />
            <ImageBox width="180px" height="157px" />
          </Flex>
        </VStack>
      </TeamSection>

      <Divider borderColor="gray.300" />

      <TeamSection title="Operations Team">
        <VStack spacing={{ base: 4, md: 6 }} align="center">
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="180px" height="135px" />
            <ImageBox width="150px" height="165px" />
            <ImageBox width="210px" height="127px" />
            <ImageBox width="127px" height="180px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="142px" height="157px" />
            <ImageBox width="172px" height="142px" />
            <ImageBox width="195px" height="172px" />
          </Flex>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={{ base: 4, md: 6 }}
            align="flex-start"
            justify="center"
            flexWrap="wrap"
          >
            <ImageBox width="157px" height="120px" />
            <ImageBox width="165px" height="187px" />
            <ImageBox width="135px" height="150px" />
          </Flex>
        </VStack>
      </TeamSection>
    </Box>
  );
};

export default TeamPage;
