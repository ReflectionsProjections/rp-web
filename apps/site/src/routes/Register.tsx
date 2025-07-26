import { Box, Button, HStack, IconButton, useToast } from "@chakra-ui/react";
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
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight
} from "react-icons/md";

const FORM_PAGES = [PersonalInfo, CareerInfo];

const NUM_PAGES = FORM_PAGES.length;

const Register = () => {
  const { displayName, email } = useOutletContext<RoleObject>();

  const [page, setPage] = useState(1);

  const backHandler = () => {
    setPage((previous) => Math.max(previous - 1, 0));
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      px={24}
      py={28}
      backgroundImage="/registration/background.svg"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
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
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img
            src={
              page % 2 === 0
                ? "/registration/page-one.svg"
                : "/registration/page-two.svg"
            }
            alt="Registration"
          />
        </Box>
        <Box
          flex="2"
          py={12}
          px={16}
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
      <HStack
        mt={8}
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
          isLoading={isSubmitting}
          variant="ghost"
          type="submit"
        />
      </HStack>
    </Box>
  );
};

export default Register;
