import {
  Box,
  Heading,
  HStack,
  Text,
  IconButton,
  useToast,
  VStack,
  useBreakpointValue,
  Center,
  Spinner
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { api, RoleObject, useFormAutosave } from "@rp/shared";
import PersonalInfo, {
  AllergiesField,
  DietaryRestrictionsField,
  EmailField,
  EthnicityField,
  GenderField,
  HowDidYouHearField,
  NameField,
  Over18Checkbox,
  TagsField
} from "@/components/Registration/pages/PersonalInfo";
import {
  initialValues,
  registrationSchema,
  registrationSchemas,
  RegistrationValues
} from "@/components/Registration/schema";
import CareerInfo, {
  EducationLevelField,
  GraduationYearField,
  MajorsField,
  MinorsField,
  OpportunitiesField,
  PersonalLinksField,
  ResumeField,
  SchoolField
} from "@/components/Registration/pages/CareerInfo";
// import { useOutletContext } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight
} from "react-icons/md";

const MotionBox = motion(Box);

const Register = () => {
  const mobile = true;
  // const { displayName, email } = useOutletContext<RoleObject>();
  const displayName = "Jacob Edley";
  const email = "edley2@illinois.edu";
  const [confirmation, setConfirmation] = useState(false);
  const [values, setValues] = useState(initialValues(displayName, email));
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   api
  //     .get("/registration/draft")
  //     .then((response) => {
  //       setValues({ ...values, ...response.data });
  //     })
  //     .catch(() => {})
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, [values]);

  if (confirmation) {
    return (
      <Box
        w="100vw"
        h="100vh"
        position="relative"
        backgroundImage="/registration/confirmation.svg"
        backgroundSize="cover"
        backgroundPosition="bottom"
        backgroundRepeat="no-repeat"
      >
        <VStack position="absolute" top="15vh" w="100%" gap="12">
          <Heading size="3xl">Thank you for registering!</Heading>
          <Text fontSize="xl">
            Please check your inbox for a confirmation email
          </Text>
        </VStack>
      </Box>
    );
  }

  return (
    <>
      {isLoading && (
        <Center
          w="100vw"
          h="100vh"
          position="fixed"
          top={0}
          left={0}
          zIndex={9999}
          bg="rgba(0,0,0,0.4)"
        >
          <Spinner size="xl" thickness="6px" color="red.500" />
        </Center>
      )}
      {mobile ? (
        <MobileRegistration
          displayName={displayName}
          email={email}
          setConfirmation={() => setConfirmation(true)}
        />
      ) : (
        <BaseRegistration
          displayName={displayName}
          email={email}
          setConfirmation={() => setConfirmation(true)}
        />
      )}
    </>
  );
};

type RegistrationProps = {
  displayName: string;
  email: string;
  setConfirmation: () => void;
};

const FORM_PAGES = [PersonalInfo, CareerInfo];

const NUM_PAGES = FORM_PAGES.length;

const BaseRegistration: React.FC<RegistrationProps> = ({
  displayName,
  email,
  setConfirmation
}) => {
  const [page, setPage] = useState(0);

  const backHandler = () => {
    setPage((previous) => Math.max(previous - 1, 0));
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      px={24}
      py={12}
      backgroundImage="/registration/background.svg"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Formik
        initialValues={{ ...initialValues(displayName, email) }}
        validationSchema={registrationSchemas[page]}
        onSubmit={async (values, actions) => {
          if (page === NUM_PAGES - 1) {
            console.log("submit", values);
            // await api.post("/registration/submit", values);
            setConfirmation();
            return;
          }

          setPage((previous) => previous + 1);
          console.log("draft", values);
          // await api.post("/registration/draft", values);
          await actions.setTouched({});
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => {
          const progress = `calc(${5 + (isSubmitting ? 1 : page / NUM_PAGES) * 95}% - 52px)`;

          return (
            <>
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="32px"
                width="100%"
                zIndex={1}
                display="flex"
                alignItems="center"
              >
                <Box
                  height="100%"
                  width="100%"
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    height="100%"
                    width={progress}
                    bg="#430C0C"
                    transition="width 0.8s ease-out"
                    position="absolute"
                    left={0}
                    top={0}
                  />
                  <Box
                    position="absolute"
                    top="50%"
                    left={progress}
                    transform="translateY(-50%)"
                    zIndex={2}
                    transition="left 0.8s ease-out"
                  >
                    <img
                      src="/registration/progress-icon.svg"
                      alt="Progress"
                      style={{ display: "block", height: "28px" }}
                    />
                  </Box>
                </Box>
              </Box>
              <RegisterForm>
                <Box as={Form} position="relative" height="calc(100% - 24px)">
                  <Box display="flex" gap={16} h="100%">
                    <Box
                      flex="1"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <img
                        src={
                          page % 2 === 0
                            ? "/registration/page-one-desktop.svg"
                            : "/registration/page-two-desktop.svg"
                        }
                        alt="Registration"
                      />
                    </Box>
                    <Box
                      flex="2"
                      py={8}
                      px={4}
                      bg="#7B0201F0"
                      borderRadius="3xl"
                      w="100%"
                      h="100%"
                      mx="auto"
                      display="flex"
                      alignItems="center"
                      color="white"
                    >
                      <Box w="100%" h="100%" px={4} overflowY="auto">
                        {FORM_PAGES[page]()}
                      </Box>
                    </Box>
                  </Box>
                  <HStack
                    mt={4}
                    justify="space-between"
                    position="absolute"
                    right={4}
                    w="100%"
                  >
                    <IconButton
                      icon={
                        <MdOutlineKeyboardDoubleArrowLeft
                          size="3xl"
                          opacity={page === 0 ? 0 : 1}
                        />
                      }
                      aria-label="Back"
                      onClick={backHandler}
                      isDisabled={page === 0}
                      variant="ghost"
                    />
                    <IconButton
                      icon={<MdOutlineKeyboardDoubleArrowRight size="3xl" />}
                      aria-label={page === NUM_PAGES - 1 ? "Submit" : "Next"}
                      isDisabled={isSubmitting}
                      variant="ghost"
                      type="submit"
                    />
                  </HStack>
                </Box>
              </RegisterForm>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

const MobileRegistration: React.FC<RegistrationProps> = ({
  displayName,
  email,
  setConfirmation
}) => {
  const startPercent = useBreakpointValue({ base: 15, lg: 10, "2xl": 5 }) ?? 5;
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const widthPercent = useTransform(
    width,
    (v) => `calc(${startPercent + v * (100 - startPercent)}% - 52px)`
  );

  const image1Opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 0]);
  const image2Opacity = useTransform(scrollYProgress, [0.5, 1], [0, 0.2]);

  const image1ShadowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const image2ShadowOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      width="100%"
      backgroundColor="#13121A"
    >
      <MotionBox width="min(100%, 800px)" px={4} pt={16} pb={8}>
        <MotionBox
          w="min(100%, 800px)"
          backgroundImage="/registration/page-one-shadow.svg"
          backgroundSize={{ base: "cover", md: "contain"}}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          style={{ opacity: image1ShadowOpacity, zIndex: 1 }}
          position="fixed"
          top={0}
          left="auto"
          right="auto"
          bottom={0}
        />

        <MotionBox
          w="min(100%, 800px)"
          backgroundImage="/registration/page-one.svg"
          backgroundSize={{ base: "cover", md: "contain"}}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="fixed"
          top={0}
          left="auto"
          right="auto"
          bottom={0}
          style={{ opacity: image1Opacity, zIndex: 1 }}
        />

        <MotionBox
          w="min(105%, 850px)"
          backgroundImage="/registration/page-two-shadow.svg"
          backgroundSize={{ base: "cover", md: "contain"}}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="fixed"
          transform="translateX(-50px)"
          top={0}
          left="auto"
          right="auto"
          bottom={0}
          style={{ opacity: image2ShadowOpacity, zIndex: 1 }}
        />

        <MotionBox
          w="min(105%, 850px)"
          backgroundImage="/registration/page-two.svg"
          backgroundSize={{ base: "cover", md: "contain"}}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="fixed"
          transform="translateX(-50px)"
          top={0}
          left="auto"
          right="auto"
          bottom={0}
          style={{ opacity: image2Opacity, zIndex: 1 }}
        />

        <MotionBox
          w="100%"
          backgroundImage="/registration/background.svg"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="fixed"
          inset={0}
        />

        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          height="24px"
          width="100%"
          zIndex={4}
          display="flex"
          alignItems="center"
        >
          <Box
            height="100%"
            width="100%"
            overflow="hidden"
            position="relative"
            bgColor="gray.900"
          >
            <MotionBox
              height="100%"
              style={{ width: widthPercent }}
              bg="#430C0C"
              transition="width 0.8s ease-out"
              position="absolute"
              left={0}
              top={0}
            />
            <MotionBox
              position="absolute"
              top="50%"
              style={{ left: widthPercent }}
              transform="translateY(-50%)"
              zIndex={2}
              transition="left 0.8s ease-out"
            >
              <img
                src="/registration/progress-icon.svg"
                alt="Progress"
                style={{ display: "block", height: "20px" }}
              />
            </MotionBox>
          </Box>
        </Box>
        <Formik
          initialValues={{ ...initialValues(displayName, email) }}
          validationSchema={registrationSchema}
          onSubmit={async (values) => {
            await api.post("/registration/submit", values);
            setConfirmation();
          }}
        >
          {({ isSubmitting }) => (
            <RegisterForm>
              <Form>
                <VStack
                  gap={6}
                  width="min(100%, 800px)"
                  color="white"
                  zIndex={3}
                  position="relative"
                >
                  <NameField />
                  <EmailField />
                  <GenderField />
                  <EthnicityField />
                  <AllergiesField />
                  <DietaryRestrictionsField />
                  <HowDidYouHearField />
                  <TagsField />
                  <SchoolField />
                  <EducationLevelField />
                  <MajorsField />
                  <MinorsField />
                  <GraduationYearField />
                  <OpportunitiesField />
                  <ResumeField />
                  <PersonalLinksField />
                  <Over18Checkbox />
                  <IconButton
                    icon={<MdOutlineKeyboardDoubleArrowRight size="3xl" />}
                    aria-label="Submit"
                    isLoading={isSubmitting}
                    variant="ghost"
                    type="submit"
                    alignSelf="flex-end"
                    color="white"
                  />
                </VStack>
              </Form>
            </RegisterForm>
          )}
        </Formik>
      </MotionBox>
    </Box>
  );
};

type RegisterFormProps = {
  children: React.ReactNode;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ children }) => {
  const toast = useToast();

  useFormAutosave<RegistrationValues>((values) => {
    // toast.promise(api.post("/registration/draft", values), {
    //   success: { title: "Autosave Successful!" },
    //   loading: { title: "Autosaving..." },
    //   error: { title: "Autosave failed" }
    // });
    console.log("autosave draft", values);
    toast({ title: "Autosave Successful" });
  });

  return children;
};

export default Register;
