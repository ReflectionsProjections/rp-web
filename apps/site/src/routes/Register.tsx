import { Box, Button, HStack, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { RoleObject, useFormAutosave } from "@rp/shared";
import PersonalInfo from "@/components/Registration/pages/PersonalInfo";
import {
  getRegistrationSchemaForPage,
  initialValues,
  RegistrationValues
} from "@/components/Registration/schema";
import CareerInfo from "@/components/Registration/pages/CareerInfo";
import { useOutletContext } from "react-router-dom";
import EventInfo from "@/components/Registration/pages/EventInfo";

const FORM_PAGES = [PersonalInfo, CareerInfo, EventInfo];

const NUM_PAGES = FORM_PAGES.length;

const Register = () => {
  const { displayName, email } = useOutletContext<RoleObject>();

  const [page, setPage] = useState(0);

  const backHandler = () => {
    setPage((previous) => Math.max(previous - 1, 0));
  };

  return (
    <Box w="100vw" h="100vh" px={24} py={32}>
      <Formik
        initialValues={{ ...initialValues(displayName, email) }}
        validationSchema={getRegistrationSchemaForPage(page)}
        onSubmit={async (values, actions) => {
          console.log(values);
          if (page === NUM_PAGES - 1) {
            // handle submit
            // redirect to confirmation
            console.log("submitted");
            return;
          }

          setPage((previous) => Math.min(previous + 1, NUM_PAGES - 1));
          // save draft form
          await actions.setTouched({});
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <RegisterForm
            page={page}
            isSubmitting={isSubmitting}
            backHandler={backHandler}
          />
        )}
      </Formik>
    </Box>
  );
};

type RegisterFormProps = {
  page: number;
  isSubmitting: boolean;
  backHandler: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({
  page,
  isSubmitting,
  backHandler
}) => {
  const toast = useToast();

  useFormAutosave<RegistrationValues>((values) => {
    console.log(values);
    toast({ title: "Form autosaved", status: "info" });
    //do autosave things
  });

  return (
    <Box as={Form} position="relative" height="100%">
      <Box display="flex" gap={16} h="100%">
        {/* Left side image */}
        <Box
          flex="1"
          bg="gray.100"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src="/your-image-path.jpg"
            alt="Registration"
            style={{
              maxWidth: "80%",
              maxHeight: "80%",
              objectFit: "contain"
            }}
          />
        </Box>
        {/* Right side form */}
        <Box
          flex="2"
          p={16}
          bg="#7B0201E5"
          borderRadius="59px"
          w="100%"
          h="100%"
          mx="auto"
          display="flex"
          alignItems="center"
          color="white"
        >
          {FORM_PAGES[page]()}
        </Box>
      </Box>
      <HStack mt={8} justify="flex-end" position="absolute" right={4}>
        <Button onClick={backHandler} isDisabled={page === 0} variant="outline">
          Back
        </Button>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          {page === NUM_PAGES - 1 ? "Submit" : "Next"}
        </Button>
      </HStack>
    </Box>
  );
};

export default Register;
