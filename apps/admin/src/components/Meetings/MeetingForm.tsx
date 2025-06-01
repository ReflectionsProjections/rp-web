import { Config } from "@/config";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { MeetingFormValues, MeetingFormSchema } from "./MeetingSchema";
import React from "react";
import moment from "moment-timezone";

type MeetingFormProps = {
  onSubmit: (
    values: MeetingFormValues,
    formikHelpers: FormikHelpers<MeetingFormValues>
  ) => Promise<unknown>;
  onCancel: () => void;
  initialValues: MeetingFormValues;
  title: string;
  submitText: string;
};

const MeetingForm: React.FC<MeetingFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  title,
  submitText
}) => {
  const handleSubmit = (
    values: MeetingFormValues,
    formikHelpers: FormikHelpers<MeetingFormValues>
  ) => {
    values.startTime = moment(values.startTime).format();
    return onSubmit(values, formikHelpers);
  };

  return (
    <Formik<MeetingFormValues>
      initialValues={initialValues}
      validationSchema={MeetingFormSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
        errors,
        touched
      }) => (
        <Form>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack gap={2}>
              <FormControl>
                <FormLabel>Committee</FormLabel>
                <Select
                  name="committeeType"
                  value={values.committeeType}
                  onChange={(e) => {
                    void setFieldValue("committeeType", e.target.value);
                  }}
                >
                  {Config.COMMITTEE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isInvalid={!!errors.startTime && touched.startTime}>
                <FormLabel>Start time</FormLabel>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={moment
                    .tz(values.startTime, "America/Chicago")
                    .format("yyyy-MM-DDTHH:mm")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              isLoading={isSubmitting}
            >
              {submitText}
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  );
};

export default MeetingForm;
