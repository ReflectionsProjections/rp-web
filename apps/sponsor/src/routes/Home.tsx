import {
  Box,
  Flex,
  Text,
  Spacer,
  Stack,
  HStack,
  Button,
  useMediaQuery
} from "@chakra-ui/react";
import "@fontsource/roboto-slab";
import "@fontsource/nunito";

const mailToUrl =
  "mailto:jangada2@illinois.edu, kaavyam2@illinois.edu?subject=%5BCOMPANY%20NAME%5D%20Interest%20in%20Reflections%20%7C%20Projections&cc=corporate@reflectionsprojections.org";

export function Home() {
  const [isMobile] = useMediaQuery("(max-width: 850px)");
  const [isSmall] = useMediaQuery("(max-width: 500px)");

  return (
    <Box>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        height="50%"
        zIndex="1"
        backgroundImage="/pink_grid_horizontal.svg"
        backgroundSize="cover"
      />

      <Flex
        minHeight="77vh"
        mt="5vh"
        mb="5vh"
        pb="15vh"
        flexDirection={"column"}
        textAlign="center"
        textColor={"white"}
      >
        <Box p="4">
          <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
            <Text
              fontSize={isSmall ? "20" : isMobile ? "33" : "56"}
              fontFamily={"Roboto Slab"}
              fontWeight={"700"}
              letterSpacing={"0.08em"}
            >
              {" "}
              reflections{" "}
            </Text>
            <Text
              fontSize={isSmall ? "52" : isMobile ? "63" : "120"}
              fontFamily={"Roboto Slab"}
              fontWeight={"300"}
              letterSpacing={"0.08em"}
              mt="-10px"
            >
              {" "}
              |{" "}
            </Text>
            <Text
              fontSize={isSmall ? "20" : isMobile ? "33" : "56"}
              fontFamily={"Roboto Slab"}
              fontWeight={"700"}
              letterSpacing={"0.08em"}
            >
              {" "}
              projections{" "}
            </Text>
          </HStack>
          <Text
            fontSize={isSmall ? "14" : isMobile ? "17" : "24"}
            whiteSpace="pre-line"
            fontFamily={"Nunito"}
            fontWeight={"400"}
          >
            {" "}
            Interested in sponsoring the {"\n"}
          </Text>
          <Text
            fontSize={isSmall ? "14" : isMobile ? "17" : "24"}
            fontFamily={"Nunito"}
            fontWeight={"900"}
          >
            {" "}
            Midwest's largest tech conference?{" "}
          </Text>
        </Box>
        <Spacer />
        {isMobile ? (
          <Stack
            direction="column"
            justifyContent="center"
            spacing="30px"
            textAlign={"center"}
          >
            <Stack
              direction="row"
              justifyContent="center"
              spacing={isSmall ? "70px" : "100px"}
            >
              <Box>
                <Text
                  fontSize={isSmall ? "18" : "23"}
                  fontFamily={"Nunito"}
                  fontWeight={"400"}
                >
                  {" "}
                  2500+{" "}
                </Text>
                <Text
                  fontSize={isSmall ? "18" : "23"}
                  fontFamily={"Nunito"}
                  fontWeight={"400"}
                >
                  {" "}
                  attendees{" "}
                </Text>
              </Box>
              <Box mr="8px">
                <Text
                  fontSize={isSmall ? "18" : "23"}
                  fontFamily={"Nunito"}
                  fontWeight={"400"}
                >
                  {" "}
                  20+{" "}
                </Text>
                <Text
                  fontSize={isSmall ? "18" : "23"}
                  fontFamily={"Nunito"}
                  fontWeight={"400"}
                >
                  {" "}
                  events{" "}
                </Text>
              </Box>
            </Stack>

            <Box transform={isMobile ? "" : "translate(-10px, -8px)"}>
              <Text
                fontSize={isSmall ? "22" : "30"}
                fontFamily={"Nunito"}
                fontWeight={"700"}
                letterSpacing={"0.09em"}
              >
                {" "}
                SEPTEMBER{" "}
              </Text>
              <Text
                fontSize={isSmall ? "22" : "30"}
                fontFamily={"Nunito"}
                fontWeight={"700"}
              >
                {" "}
                16-20{" "}
              </Text>
            </Box>
          </Stack>
        ) : (
          <Stack
            direction="row"
            justifyContent="center"
            spacing="150px"
            textAlign={"center"}
          >
            <Box>
              <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}>
                {" "}
                2500+{" "}
              </Text>
              <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}>
                {" "}
                attendees{" "}
              </Text>
            </Box>

            <Box transform={isMobile ? "" : "translate(-10px, -8px)"}>
              <Text
                fontSize="40"
                fontFamily={"Nunito"}
                fontWeight={"700"}
                letterSpacing={"0.09em"}
              >
                {" "}
                SEPTEMBER{" "}
              </Text>
              <Text fontSize="40" fontFamily={"Nunito"} fontWeight={"700"}>
                {" "}
                16-20{" "}
              </Text>
            </Box>

            <Box>
              <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}>
                {" "}
                20+{" "}
              </Text>
              <Text fontSize="32" fontFamily={"Nunito"} fontWeight={"400"}>
                {" "}
                events{" "}
              </Text>
            </Box>
          </Stack>
        )}
        <Spacer />
        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="center"
          spacing={isMobile ? "30px" : "220px"}
          alignItems="center"
          mt="10px"
        >
          <Button
            color={"#000000"}
            bg={"#EDF2F7"}
            w={"220px"}
            zIndex={"1"}
            _hover={{ bg: "#FFEF64" }}
            as="a"
            href="/R_P_2025_Corporate_Sponsor_Packet.pdf"
          >
            {" "}
            Sponsorship Packet{" "}
          </Button>
          <Button
            color={"#000000"}
            bg={"#EDF2F7"}
            w={"220px"}
            zIndex={"1"}
            _hover={{ color: "#000000", bg: "#FFEF64" }}
            as="a"
            href={mailToUrl}
          >
            {" "}
            I'm Interested!{" "}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}
