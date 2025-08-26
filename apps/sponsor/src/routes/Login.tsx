import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Input,
  Center,
  useMediaQuery,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

import TwoFactor from "./TwoFactor";
import { api } from "@rp/shared";

export function Login() {
  const [isSmall] = useMediaQuery("(max-width: 600px)");
  const [isXSmall] = useMediaQuery("(max-width: 400px)");
  const [email, setEmail] = useState(""); // State to store the email input
  const [codePage, setCodePage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const showToast = () => {
    toast({
      title: "Login Code Sent!",
      description: "Please check your email for the login code.",
      status: "success",
      duration: 5000,
      isClosable: true
    });
  };

  const sponsorLogin = async (email: string) => {
    try {
      await api.post("/auth/sponsor/login", { email });
      setCodePage(1);
      showToast();
    } catch (error) {
      setError("Invalid Email. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleSubmit = () => {
    // console.log("Button clicked, email:", email);
    if (!email) {
      setError("Please enter an email address.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    void sponsorLogin(email);
  };

  // Log the input value whenever it's updated
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    // console.log("Input value:", e.target.value);  // Log the input value
  };

  return (
    <Box minHeight={"800px"}>
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
        height="77vh"
        mt="2vh"
        mb="5vh"
        pb="15vh"
        flexDirection={"column"}
        textAlign="center"
        textColor={"white"}
      >
        <Center mt="15vh">
          <Box p="4">
            <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
              <Text
                fontSize={isXSmall ? "20" : isSmall ? "28" : "43"}
                fontFamily={"Roboto Slab"}
                fontWeight={"700"}
                letterSpacing={"0.08em"}
              >
                {" "}
                reflections{" "}
              </Text>
              <Text
                fontSize={isXSmall ? "52" : isSmall ? "60" : "76"}
                fontFamily={"Roboto Slab"}
                fontWeight={"300"}
                letterSpacing={"0.08em"}
                mt="-10px"
              >
                {" "}
                |
              </Text>
              <Text
                fontSize={isXSmall ? "20" : isSmall ? "28" : "43"}
                fontFamily={"Roboto Slab"}
                fontWeight={"700"}
                letterSpacing={"0.08em"}
              >
                {" "}
                projections{" "}
              </Text>
            </HStack>
            <HStack justifyContent="center" spacing="8px" textAlign={"center"}>
              <Text
                fontSize={isXSmall ? "20" : isSmall ? "28" : "43"}
                fontFamily={"Nunito"}
                fontWeight={"500"}
                letterSpacing={"0.08em"}
              >
                {" "}
                Resume Book{" "}
              </Text>
            </HStack>
          </Box>
        </Center>
        {codePage === 1 ? (
          <TwoFactor
            email={email}
            sponsorLogin={(email) => {
              void sponsorLogin(email);
            }}
          />
        ) : (
          <Box mt="5vh" zIndex="2">
            <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
              Enter your Email
            </Text>
            <Input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="name@example.com"
              width="250px"
              mt="20px"
              // mx="auto"
              // bg="white"
              textColor="white"
              // borderRadius="5px"
              _placeholder={{ color: "gray.400" }}
            />
            <Button
              bg="blue.500"
              color="white"
              borderRadius="5px"
              onClick={() => handleSubmit()}
              zIndex="3"
              m={4}
              mb={5}
              _hover={{ bg: "blue.600" }}
            >
              Submit
            </Button>
            {error && (
              <Box
                mt={2}
                p={2}
                bg="red.500"
                color="white"
                borderRadius="md"
                maxWidth="250px"
                mx="auto"
              >
                {error}
              </Box>
            )}
          </Box>
        )}
      </Flex>
    </Box>
  );
}
