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
import axios from "axios";
import { api, RoleObject, useFormAutosave } from "@rp/shared";
import {
  finalRegistrationSchema,
  initialValues,
  registrationSchema,
  RegistrationValues
} from "@/components/Registration/schema";
import { useOutletContext } from "react-router-dom";
import {
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
  const [isLoading, setIsLoading] = useState(false);

  const { scrollYProgress } = useScroll();
  const mobile = useBreakpointValue({ base: true, "2xl": false });

  const toast = useToast();

  const processFinalRegistration = (values: RegistrationValues) => {
    const processedValues = finalRegistrationSchema.validateSync(values, {
      stripUnknown: true
    });

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
                  open: () => {
                    toast.promise(
                      api.get("/s3/download").then((response) => {
                        window.open(response.data.url, "_blank");
                      }),
                      {
                        success: { title: "File opened successfully!" },
                        loading: { title: "Opening file..." },
                        error: { title: "Failed to open file" }
                      }
                    );
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayName, email]);

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

  const LoadingIndicator = () => (
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
  );

  const Background = () => {
    const PageBackground: React.FC<{
      backgroundImage: string;
      opacity: MotionValue<number>;
    }> = ({ backgroundImage, opacity }) => (
      <MotionBox
        w={{ base: "min(100%, 800px)", "2xl": "100%" }}
        h={{ base: "calc(100% - 32px)", "2xl": "125%" }}
        backgroundImage={backgroundImage}
        backgroundSize={{ base: "cover", md: "contain" }}
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        style={{ opacity, zIndex: 1 }}
        position="fixed"
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
        position="fixed"
        inset={0}
        top="32px"
        background={{
          base: "#12131A",
          "2xl": "linear-gradient(90deg, #12131Ac0 0%, #7B0201c0 30%)"
        }}
      >
        <PageBackground
          backgroundImage="/registration/page-one-shadow.svg"
          opacity={image1ShadowOpacity}
        />

        <PageBackground
          backgroundImage="/registration/page-one.svg"
          opacity={image1Opacity}
        />

        <PageBackground
          backgroundImage="/registration/page-two-shadow.svg"
          opacity={image2ShadowOpacity}
        />

        <PageBackground
          backgroundImage="/registration/page-two.svg"
          opacity={image2Opacity}
        />

        <MotionBox
          w="100%"
          h="calc(100% - 32px)"
          backgroundImage="/registration/background.svg"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          position="fixed"
          inset={0}
          top="32px"
        />
      </Box>
    );
  };

  const ProgressBar = () => {
    const width = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    });
    const progress = useTransform(width, (v) => `calc(${v * 100}% + 48px)`);

    return (
      <Box
        height="32px"
        width="100%"
        zIndex={4}
        display="flex"
        alignItems="center"
        backgroundColor="#241f1fff"
        position="fixed"
        top={0}
      >
        <Box height="100%" width="100%" overflow="hidden" position="relative">
          <MotionBox
            height="100%"
            style={{ width: progress }}
            bg="#a01c1cff"
            transition="width 0.8s ease-out"
            position="absolute"
            left={0}
            top={0}
          />
          <MotionBox
            position="absolute"
            top="50%"
            style={{ left: progress }}
            transform="translateY(-50%)"
            zIndex={2}
            transition="left 0.8s ease-out"
          >
            <img
              src="/registration/progress-icon.svg"
              alt="Progress"
              style={{ display: "block", height: "28px" }}
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
    <Box backgroundColor="#12131A" fontFamily="Magistral">
      {isLoading && <LoadingIndicator />}
      <Background />
      <ProgressBar />

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
              pb={{ base: "50vh", "2xl": 8 }}
              mt="32px"
            >
              <RegisterForm>
                <VStack as={Form} color="white" zIndex={3} gap={16}>
                  {mobile ? <MobileForm /> : <DesktopForm />}
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
              </RegisterForm>
            </Box>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default Register;
