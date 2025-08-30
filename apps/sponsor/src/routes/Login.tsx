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
import { useState } from "react";
import { api } from "@rp/shared";
import { Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

type EmailSubmitHandler = (
  values: {
    email: string;
  },
  formikHelpers: FormikHelpers<{
    email: string;
  }>
) => void | Promise<void>;

type TwoFactorSubmitHandler = (
  values: {
    twoFactor: string;
  },
  formikHelpers: FormikHelpers<{
    twoFactor: string;
  }>
) => void | Promise<void>;

export function Login() {
  const [isSmall] = useMediaQuery("(max-width: 600px)");
  const [isXSmall] = useMediaQuery("(max-width: 400px)");

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
        <Box mt="5vh" zIndex="2">
          <LoginForm />
        </Box>
      </Flex>
    </Box>
  );
}

function LoginForm() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  const submitEmail: EmailSubmitHandler = ({ email }, { setSubmitting }) => {
    toast.promise(
      api
        .post("/auth/sponsor/login", { email })
        .then(() => setEmail(email))
        .finally(() => setSubmitting(false)),
      {
        success: { title: "Please check your email for the code" },
        error: { title: "Something went wrong. Please try again." },
        loading: { title: "Loading..." }
      }
    );
  };

  const submitTwoFactor: TwoFactorSubmitHandler = (
    { twoFactor },
    { setSubmitting }
  ) => {
    toast.promise(
      api
        .post("/auth/sponsor/verify", {
          email: email!,
          sixDigitCode: twoFactor
        })
        .then((response) => {
          localStorage.setItem("jwt", response.data.token);
          navigate("/resume-book");
        })
        .finally(() => setSubmitting(false)),
      {
        success: { title: "Success" },
        error: { title: "Invalid Code. Please try again." },
        loading: { title: "Loading..." }
      }
    );
  };

  return email ? (
    <TwoFactorPage onSubmit={submitTwoFactor} />
  ) : (
    <EmailPage onSubmit={submitEmail} />
  );
}

function EmailPage({ onSubmit }: { onSubmit: EmailSubmitHandler }) {
  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={yup.object({
        email: yup
          .string()
          .email("Please enter a valid email address.")
          .required("Please enter an email address.")
      })}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
            Enter your Email
          </Text>
          <Input
            type="email"
            name="email"
            placeholder="name@example.com"
            width="250px"
            mt="20px"
            textColor="white"
            _placeholder={{ color: "gray.400" }}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            bg="blue.500"
            color="white"
            borderRadius="5px"
            zIndex="3"
            m={4}
            mb={5}
            _hover={{ bg: "blue.600" }}
            type="submit"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
          {errors.email && touched.email && (
            <Box
              mt={2}
              p={2}
              bg="red.500"
              color="white"
              borderRadius="md"
              maxWidth="250px"
              mx="auto"
            >
              {errors.email}
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}

function TwoFactorPage({ onSubmit }: { onSubmit: TwoFactorSubmitHandler }) {
  return (
    <Formik
      initialValues={{ twoFactor: "" }}
      validationSchema={yup.object({
        twoFactor: yup
          .string()
          .min(6, "Please enter a longer code")
          .required("Please enter a code")
      })}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
            Enter Code:
          </Text>
          <Input
            name="twoFactor"
            width="250px"
            mt="20px"
            textColor="white"
            _placeholder={{ color: "gray.400" }}
            value={values.twoFactor}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Button
            bg="blue.500"
            color="white"
            borderRadius="5px"
            zIndex="3"
            m={4}
            mb={5}
            _hover={{ bg: "blue.600" }}
            type="submit"
            isLoading={isSubmitting}
          >
            Submit
          </Button>
          {errors.twoFactor && touched.twoFactor && (
            <Box
              mt={2}
              p={2}
              bg="red.500"
              color="white"
              borderRadius="md"
              maxWidth="250px"
              mx="auto"
            >
              {errors.twoFactor}
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}
