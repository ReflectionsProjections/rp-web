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
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { api, RoleObject, useFormAutosave } from "@rp/shared";
// import successAnimation from "../assets/animations/success.json";
import confirmationAnimation from "../assets/animations/confirmation.json";
import {
  finalRegistrationSchema,
  initialValues,
  registrationSchema,
  RegistrationValues
} from "@/components/Registration/schema";
import { useOutletContext } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
  NameField,
  EmailField,
  GenderField,
  DietaryRestrictionsField,
  EthnicityField,
  AllergiesField,
  PuzzleBangInterest,
  MechManiaInterest,
  HowDidYouHearField,
  TagsField,
  SchoolField,
  GraduationYearField,
  MajorsField,
  MinorsField,
  EducationLevelField,
  OpportunitiesField,
  PersonalLinksField,
  ResumeField,
  Over18Checkbox
} from "@/components/Registration/questions";
import Lottie from "lottie-react";

const MotionBox = motion(Box);

const uploadResume = async (
  url: string,
  fields: Record<string, unknown>,
  file: File
) => {
  const form = new FormData();

  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof Blob || typeof value === "string") {
      form.append(key, value);
    } else {
      console.error(`Unexpected value type for key "${key}":`, value);
    }
  }

  form.append("file", file);

  await axios.post(url, form, {
    headers: {
      "Content-Type": "multipart/form-data"
      // ...fields,
    }
  });
};

type RegisterFormProps = {
  children: React.ReactNode;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ children }) => {
  const toast = useToast();

  useFormAutosave<RegistrationValues>((values) => {
    toast.promise(
      api.post("/registration/draft", {
        ...values,
        resume: undefined
      }),
      {
        success: { title: "Autosave Successful!" },
        loading: { title: "Autosaving..." },
        error: { title: "Autosave failed" }
      }
    );
  });

  return children;
};

const Register = () => {
  const { displayName, email } = useOutletContext<RoleObject>();
  const [confirmation, setConfirmation] = useState(false);
  const [values, setValues] = useState<RegistrationValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const mobile = useBreakpointValue({ base: true, "2xl": false });

  const toast = useToast();

  const processFinalRegistration = (values: RegistrationValues) => {
    const processedValues = finalRegistrationSchema.validateSync(
      {
        ...values,
        hasResume: values.resume !== null
      },
      {
        stripUnknown: true
      }
    );

    if (values.allergiesOther !== "") {
      processedValues.allergies = processedValues.allergies.map((item) =>
        item === "Other" ? values.allergiesOther : item
      );
    }

    if (values.dietaryOther !== "") {
      processedValues.dietaryRestrictions =
        processedValues.dietaryRestrictions.map((item) =>
          item === "Other" ? values.dietaryOther : item
        );
    }

    if (
      processedValues.educationLevel === "Other" &&
      values.educationOther !== ""
    ) {
      processedValues.educationLevel = values.educationOther;
    }

    if (values.ethnicityOther !== "") {
      processedValues.ethnicity = processedValues.ethnicity.map((item) =>
        item === "Other" ? values.ethnicityOther : item
      );
    }

    if (processedValues.gender === "Other" && values.genderOther !== "") {
      processedValues.gender = values.genderOther;
    }

    return processedValues;
  };

  useEffect(() => {
    api
      .get("/registration/draft")
      .then((response) => {
        setValues({
          ...response.data,
          resume:
            response.data.resume !== ""
              ? {
                  name: response.data.resume,
                  open: async () => {
                    await api
                      .get("/s3/download")
                      .then((response) => window.open(response.data.url));
                  }
                }
              : null,
          over18: false
        });
      })
      .catch(() => {
        setValues({ ...initialValues(), name: displayName, email });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [displayName, email]);

  const LoadingIndicator = () => (
    <Center
      w="100vw"
      h="100vh"
      position="absolute"
      top={0}
      left={0}
      zIndex={9999}
      bg="rgba(0,0,0,0.4)"
    >
      <Spinner size="xl" thickness="6px" color="red.500" />
    </Center>
  );

  const Background = () => {
    const PageBackground: React.FC<{
      backgroundImage: string;
      opacity: MotionValue<number>;
      initialOpacity: number;
    }> = ({ backgroundImage, opacity, initialOpacity }) => (
      <MotionBox
        w={{ base: "min(100%, 800px)", "2xl": "100%" }}
        h={{ base: "100%", "2xl": "125%" }}
        backgroundImage={backgroundImage}
        backgroundSize={{ base: "cover", md: "contain" }}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        initial={{ opacity: initialOpacity }}
        style={{ opacity, zIndex: 1 }}
        position="absolute"
        top={{ "2xl": "-12.5%" }}
        left={{ base: "50%", "2xl": 0 }}
        transform="translateX(-50%)"
      />
    );

    const finalOpacity = useBreakpointValue({ base: 0.2, "2xl": 0.4 }) ?? 0.2;

    const image1Opacity = useTransform(
      scrollYProgress,
      [0, 0.5],
      [finalOpacity, 0]
    );
    const image2Opacity = useTransform(
      scrollYProgress,
      [0.5, 1],
      [0, finalOpacity]
    );

    const image1ShadowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const image2ShadowOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

    return (
      <Box
        w="100%"
        h="calc(100% - 32px)"
        position="absolute"
        top="32px"
        background={{
          base: "#12131A",
          "2xl": "linear-gradient(90deg, #12131Ac0 0%, #7B0201c0 30%)"
        }}
      >
        <PageBackground
          backgroundImage="/registration/page-one-shadow.svg"
          opacity={image1ShadowOpacity}
          initialOpacity={1}
        />

        <PageBackground
          backgroundImage="/registration/page-one.svg"
          opacity={image1Opacity}
          initialOpacity={finalOpacity}
        />

        <PageBackground
          backgroundImage="/registration/page-two-shadow.svg"
          opacity={image2ShadowOpacity}
          initialOpacity={0}
        />

        <PageBackground
          backgroundImage="/registration/page-two.svg"
          opacity={image2Opacity}
          initialOpacity={0}
        />

        <MotionBox
          w="100%"
          h="100%"
          backgroundImage="/registration/background.svg"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="absolute"
          inset={0}
        />
      </Box>
    );
  };

  const ProgressBar = () => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (containerRef.current && containerRef.current.scrollTop > 0) {
          setHasScrolled(true);
        }
      };

      const container = containerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, []);

    const controlledProgress = useTransform(scrollYProgress, (value) => {
      return hasScrolled ? value : 0;
    });

    const width = useSpring(controlledProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
    const initialProgress = "48px";
    const progress = useTransform(
      width,
      (v) => `calc(${v * 100}% + ${initialProgress})`
    );

    const roadMarkers = Array.from({ length: 50 }, (_, i) => (
      <Box
        key={i}
        position="absolute"
        left={`${i * 2}%`}
        top="50%"
        transform="translateY(-50%)"
        width="16px"
        height="1px"
        backgroundColor="#ffd700"
        borderRadius="1px"
        zIndex={1}
        opacity={0.8}
      />
    ));

    return (
      <Box
        height="32px"
        width="100%"
        zIndex={4}
        display="flex"
        alignItems="center"
        position="sticky"
        backgroundColor="#1a1a1a"
        top={0}
      >
        <Box
          height="24px"
          width="calc(100% - 24px)"
          overflow="hidden"
          position="relative"
          backgroundColor="#333"
          borderRadius="10px"
          margin="0 12px"
          border="1px solid #555"
        >
          {/* ROAD */}
          <MotionBox
            height="100%"
            style={{ width: progress }}
            backgroundColor="#666"
            transition="width 0.8s ease-out"
            position="absolute"
            left={0}
            top={0}
            borderRadius="10px"
          />

          {/* DASHED */}
          {roadMarkers}

          <MotionBox
            position="absolute"
            top="50%"
            initial={{ left: initialProgress }}
            style={{ left: progress }}
            transform="translateY(-50%)"
            zIndex={2}
            transition="left 0.8s ease-out"
          >
            <img
              src="/registration/progress-icon.svg"
              alt="Progress"
              style={{ display: "block", height: "22px" }}
            />
          </MotionBox>
        </Box>
      </Box>
    );
  };

  const DesktopForm = () => (
    <VStack gap={64} w="100%" h="100%" justifyContent="space-between">
      <VStack gap={16} w="100%" h="100%">
        <HStack gap={16} w="100%" alignItems="start">
          <NameField />
          <EmailField />
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <VStack gap={8} h="100%" flex={1} justifyContent="space-between">
            <GenderField />
            <DietaryRestrictionsField />
          </VStack>
          <VStack gap={8} flex={1} justifyContent="space-between" h="100%">
            <EthnicityField />
            <AllergiesField />
          </VStack>
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <PuzzleBangInterest />
          <MechManiaInterest />
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <HowDidYouHearField />
          <TagsField />
        </HStack>
      </VStack>
      <VStack gap={16} w="100%" h="100%">
        <HStack gap={16} w="100%" alignItems="start">
          <SchoolField />
          <GraduationYearField />
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <MajorsField />
          <MinorsField />
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <EducationLevelField />
          <OpportunitiesField />
        </HStack>
        <HStack gap={16} w="100%" alignItems="start">
          <PersonalLinksField />
          <ResumeField />
        </HStack>
        <Box alignSelf="end">
          <Over18Checkbox />
        </Box>
      </VStack>
    </VStack>
  );

  const ConfirmationScreen = () => (
    <MotionBox
      key="confirmation-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      w="100%"
      h="100%"
      position="relative"
      overflow="hidden"
      bg={"linear-gradient(90deg, #7B0201c0 0%, #12131Ac0 80%)"}
    >
      <Lottie
        animationData={confirmationAnimation}
        loop={false}
        autoplay
        rendererSettings={{
          preserveAspectRatio: "xMidYMax slice"
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <VStack position="relative" zIndex={3} top="15%" w="100%" gap={3} px={5}>
        {/* <Lottie
          animationData={successAnimation}
          loop={false}
          style={{ height: 200 }}
        /> */}
        <Heading
          size="3xl"
          fontFamily="Magistral"
          color="white"
          textAlign="center"
        >
          Thank you for registering!
        </Heading>
        <Text
          fontSize="2xl"
          fontFamily="Magistral"
          color="white"
          textAlign="center"
        >
          Look out for a confirmation email from R|P soon!
        </Text>
      </VStack>
    </MotionBox>
  );

  const MobileForm = () => (
    <VStack gap={16} width="min(100%, 800px)" alignItems="center">
      <NameField />
      <EmailField />
      <GenderField />
      <EthnicityField />
      <AllergiesField />
      <DietaryRestrictionsField />
      <HowDidYouHearField />
      <PuzzleBangInterest />
      <MechManiaInterest />
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
    </VStack>
  );

  return (
    <AnimatePresence>
      {confirmation ? (
        <ConfirmationScreen key="confirmation" />
      ) : (
        <VStack
          backgroundColor="#12131A"
          fontFamily="Magistral"
          h="100%"
          gap={0}
        >
          {isLoading && <LoadingIndicator />}
          <ProgressBar />
          <Background />

          <Box
            ref={containerRef}
            h="100%"
            w="100%"
            zIndex={3}
            overflowY="scroll"
          >
            {values && (
              <Formik
                initialValues={values}
                validationSchema={registrationSchema}
                onSubmit={(values, helpers) => {
                  setIsLoading(true);
                  const registration = processFinalRegistration(values);
                  toast.promise(
                    Promise.all([
                      api.post("/registration/submit", registration),
                      api.post("/registration/draft", {
                        ...values,
                        resume: values.resume?.name ?? ""
                      }),
                      (async () => {
                        if (!values.resume?.file) {
                          return;
                        }
                        const { data: download } = await api.get("/s3/upload");
                        await uploadResume(
                          download.url,
                          download.fields,
                          values.resume.file
                        );
                      })()
                    ])
                      .then(() => {
                        setConfirmation(true);
                      })
                      .catch(() => {
                        helpers.setSubmitting(false);
                      })
                      .finally(() => {
                        setIsLoading(false);
                      }),
                    {
                      success: { title: "Form Submitted!" },
                      loading: { title: "Submitting..." },
                      error: { title: "Submission failed" }
                    }
                  );
                }}
              >
                {({ isSubmitting }) => (
                  <Box
                    w={{ "2xl": "75%" }}
                    ml={{ "2xl": "25%" }}
                    display="flex"
                    justifyContent="center"
                    px={4}
                    pt={8}
                    position="relative"
                  >
                    <RegisterForm>
                      <VStack
                        as={Form}
                        color="white"
                        gap={16}
                        h="fit-content"
                        mb={{ base: "10vh", "2xl": 8 }}
                      >
                        {mobile ? <MobileForm /> : <DesktopForm />}
                        <IconButton
                          icon={
                            <>
                              <Text
                                fontSize="lg"
                                fontWeight="bold"
                                align="center"
                                px={2}
                              >
                                Submit
                              </Text>
                              <MdOutlineKeyboardDoubleArrowRight size="48" />
                            </>
                          }
                          aria-label="Submit"
                          isLoading={isSubmitting}
                          variant="ghost"
                          type="submit"
                          alignSelf="flex-end"
                          color="white"
                        />
                      </VStack>
                    </RegisterForm>
                  </Box>
                )}
              </Formik>
            )}
          </Box>
        </VStack>
      )}
    </AnimatePresence>
  );
};

export default Register;
