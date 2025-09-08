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
        <Box mt="5vh" zIndex="2" display="flex" justifyContent="center">
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

const MAX_DIGITS = 6;

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
        setFieldValue,
        handleSubmit,
        isSubmitting
      }) => (
        <Form onSubmit={handleSubmit}>
          <Text fontSize="24" fontFamily={"Nunito"} fontWeight={"400"}>
            Enter Code:
          </Text>

          <Box mt="20px" w="fit-content">
            <CodeBoxes
              name="twoFactor"
              value={values.twoFactor}
              setValue={(v) => void setFieldValue("twoFactor", v)}
              onComplete={() => handleSubmit()}
              isInvalid={!!errors["twoFactor"] && !!touched["twoFactor"]}
            />
          </Box>

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

function CodeBoxes({
  value,
  name,
  setValue,
  onComplete,
  isInvalid
}: {
  value: string;
  name: string;
  setValue: (v: string) => void;
  onComplete: () => void;
  isInvalid: boolean;
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.slice(0, MAX_DIGITS);
    setValue(digits);

    if (digits.length === MAX_DIGITS) {
      setTimeout(onComplete, 100);
    }
  };

  const focusInput = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    el?.focus();
  };

  const inputId = `${name}-hidden`;

  return (
    <Box position="relative" width="fit-content">
      <HStack
        spacing="10px"
        w="fit-content"
        onClick={() => focusInput(inputId)}
        cursor="text"
        userSelect="none"
      >
        {Array.from({ length: MAX_DIGITS }).map((_, i) => {
          const char = value[i] ?? "";
          const isCursorHere =
            isFocused && i === value.length && value.length < MAX_DIGITS;
          return (
            <Box
              key={i}
              w="44px"
              h="56px"
              borderRadius="md"
              borderWidth={isCursorHere ? "3px" : "1.5px"}
              borderColor={
                isInvalid
                  ? "red.400"
                  : isCursorHere
                    ? "blue.500"
                    : "whiteAlpha.400"
              }
              bg="blackAlpha.300"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              color="white"
              position="relative"
              transition="all 0.2s ease-in-out"
              boxShadow={
                isCursorHere ? "0 0 0 2px rgba(66, 153, 225, 0.3)" : "none"
              }
            >
              <Box
                as="span"
                lineHeight="1"
                mt="2px"
                letterSpacing="0"
                animation={isCursorHere ? "blink 1.5s infinite" : "none"}
                sx={{
                  "@keyframes blink": {
                    "0%, 50%": { opacity: 1 },
                    "51%, 100%": { opacity: 0 }
                  }
                }}
              >
                {char || (isCursorHere ? "|" : "")}
              </Box>
            </Box>
          );
        })}
      </HStack>

      <Input
        id={inputId}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        position="absolute"
        inset="0"
        opacity={0}
        _focusVisible={{ outline: "none", boxShadow: "none" }}
        autoComplete="one-time-code"
        maxLength={MAX_DIGITS}
        aria-label="6-digit verification code"
      />
    </Box>
  );
}
