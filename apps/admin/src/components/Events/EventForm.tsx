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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Checkbox,
  ModalFooter,
  Button
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { EventFormValues, EventFormSchema } from "./EventSchema";
import React from "react";
import moment from "moment-timezone";

type EventFormProps = {
  onSubmit: (
    values: EventFormValues,
    formikHelpers: FormikHelpers<EventFormValues>
  ) => Promise<unknown>;
  onCancel: () => void;
  initialValues: EventFormValues;
  title: string;
  submitText: string;
};

const EventForm: React.FC<EventFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  title,
  submitText
}) => {
  const handleSubmit = (
    values: EventFormValues,
    formikHelpers: FormikHelpers<EventFormValues>
  ) => {
    values.startTime = moment(values.startTime).format();
    values.endTime = moment(values.endTime).format();
    return onSubmit(values, formikHelpers);
  };

  return (
    <Formik<EventFormValues>
      initialValues={initialValues}
      validationSchema={EventFormSchema}
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
              <FormControl isInvalid={!!errors.name && !!touched.name}>
                <FormLabel>Event name</FormLabel>
                <Input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel>Event type</FormLabel>
                <Select
                  name="eventType"
                  value={values.eventType}
                  onChange={(e) => {
                    void setFieldValue("eventType", e.target.value);
                  }}
                >
                  {Config.EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Virtual or In-Person</FormLabel>
                <Select
                  name="isVirtual"
                  value={values.isVirtual ? "true" : "false"}
                  onChange={(e) =>
                    void setFieldValue("isVirtual", e.target.value === "true")
                  }
                >
                  <option value="true">Virtual</option>
                  <option value="false">In-Person</option>
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

              <FormControl isInvalid={!!errors.endTime && touched.endTime}>
                <FormLabel>End time</FormLabel>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={moment
                    .tz(values.endTime, "America/Chicago")
                    .format("yyyy-MM-DDTHH:mm")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.points && touched.points}>
                <FormLabel>Points</FormLabel>
                <NumberInput
                  min={0}
                  value={values.points}
                  onChange={(_, val) => void setFieldValue("points", val)}
                >
                  <NumberInputField name="points" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>{errors.points}</FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.description && !!touched.description}
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.imageUrl && !!touched.imageUrl}>
                <FormLabel>Image URL</FormLabel>
                <Input
                  name="imageUrl"
                  value={values.imageUrl ?? ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.location && !!touched.location}>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormErrorMessage>{errors.location}</FormErrorMessage>
              </FormControl>

              <FormControl>
                <Checkbox
                  isChecked={values.isVisible}
                  onChange={(e) =>
                    void setFieldValue("isVisible", e.target.checked)
                  }
                >
                  Is Visible
                </Checkbox>
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

export default EventForm;
