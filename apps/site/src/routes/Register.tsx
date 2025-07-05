import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useToast
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useFormAutosave } from "@rp/shared";
import PersonalInfo from "@/components/Registration/pages/PersonalInfo";
import {
  getRegistrationSchemaForPage,
  initialValues,
  RegistrationValues
} from "@/components/Registration/schema";

const FORM_PAGES = [PersonalInfo];

const NUM_PAGES = FORM_PAGES.length;

const Register = () => {
  // Simulate autofilled email from login
  // In real app, replace with actual user email
  const userEmail = "user@example.com";

  const [page, setPage] = useState(0);

  const backHandler = () => {
    setPage((previous) => Math.max(previous - 1, 0));
  };

  return (
    <Box p={6}>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input value={userEmail} isReadOnly disabled />
      </FormControl>
      <Formik
        initialValues={{ ...initialValues }}
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
    <Form>
      {FORM_PAGES[page]()}
      <HStack mt={8} justify="flex-end">
        <Button onClick={backHandler} isDisabled={page === 0} variant="outline">
          Back
        </Button>
        <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
          {page === NUM_PAGES - 1 ? "Submit" : "Next"}
        </Button>
      </HStack>
    </Form>
  );
};

export default Register;
