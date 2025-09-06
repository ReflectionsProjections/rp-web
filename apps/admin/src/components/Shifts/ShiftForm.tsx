import React from "react";
import {
  VStack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  useToast
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import { api, Shift, ShiftRoleType } from "@rp/shared";

// Set timezone to Chicago (Central Time)
moment.tz.setDefault("America/Chicago");

type ShiftFormProps = {
  shift?: Shift | null;
  onSuccess: () => void;
  onCancel: () => void;
};

type ShiftFormValues = {
  name: string;
  role: ShiftRoleType;
  startTime: string;
  endTime: string;
  location: string;
};

const shiftRoleOptions: { value: ShiftRoleType; label: string }[] = [
  { value: "CLEAN_UP", label: "Clean Up" },
  { value: "DINNER", label: "Dinner" },
  { value: "CHECK_IN", label: "Check In" },
  { value: "SPEAKER_BUDDY", label: "Speaker Buddy" },
  { value: "DEV_ON_CALL", label: "Dev On Call" },
  { value: "CHAIR_ON_CALL", label: "Chair On Call" }
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Shift name is required")
    .min(2, "Shift name must be at least 2 characters"),
  role: Yup.string()
    .oneOf(
      shiftRoleOptions.map((opt) => opt.value),
      "Invalid role"
    )
    .required("Role is required"),
  startTime: Yup.string().required("Start time is required"),
  endTime: Yup.string()
    .required("End time is required")
    .test(
      "is-after-start",
      "End time must be after start time",
      function (endTime: string) {
        const { startTime } = this.parent as { startTime: string };
        if (!startTime || !endTime) return true;

        const start = moment.tz(startTime, "America/Chicago");
        const end = moment.tz(endTime, "America/Chicago");

        return end.isAfter(start);
      }
    ),
  location: Yup.string()
    .required("Location is required")
    .min(2, "Location must be at least 2 characters")
});

const ShiftForm: React.FC<ShiftFormProps> = ({
  shift,
  onSuccess,
  onCancel
}) => {
  const toast = useToast();

  const initialValues: ShiftFormValues = {
    name: shift?.name || "",
    role: shift?.role || "CHECK_IN",
    startTime: shift?.startTime
      ? moment.tz(shift.startTime, "America/Chicago").format("YYYY-MM-DDTHH:mm")
      : moment().format("YYYY-MM-DDTHH:mm"),
    endTime: shift?.endTime
      ? moment.tz(shift.endTime, "America/Chicago").format("YYYY-MM-DDTHH:mm")
      : moment().add(1, "hour").format("YYYY-MM-DDTHH:mm"),
    location: shift?.location || ""
  };

  const handleSubmit = async (
    values: ShiftFormValues,
    { setSubmitting }: FormikHelpers<ShiftFormValues>
  ) => {
    try {
      // Convert local datetime to ISO string for API
      const startTime = moment
        .tz(values.startTime, "America/Chicago")
        .toISOString();
      const endTime = moment
        .tz(values.endTime, "America/Chicago")
        .toISOString();

      const shiftData = {
        name: values.name,
        role: values.role,
        startTime,
        endTime,
        location: values.location
      };

      if (shift) {
        // Update existing shift
        await api.patch(
          `/shifts/${shift.shiftId}` as "/shifts/:shiftId",
          shiftData
        );
        toast({
          title: "Shift updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      } else {
        // Create new shift
        await api.post("/shifts", shiftData);
        toast({
          title: "Shift created successfully",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving shift:", error);
      toast({
        title: "Error saving shift",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!!(errors.name && touched.name)}>
              <FormLabel>Shift Name</FormLabel>
              <Field name="name">
                {({ field }: FieldProps) => (
                  <Input {...field} placeholder="e.g., Morning Check-in" />
                )}
              </Field>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!(errors.role && touched.role)}>
              <FormLabel>Role</FormLabel>
              <Field name="role">
                {({ field }: FieldProps) => (
                  <Select {...field}>
                    {shiftRoleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}
              </Field>
              <FormErrorMessage>{errors.role}</FormErrorMessage>
            </FormControl>

            <VStack spacing={4}>
              <FormControl
                isInvalid={!!(errors.startTime && touched.startTime)}
              >
                <FormLabel>Start Time</FormLabel>
                <Field name="startTime">
                  {({ field }: FieldProps) => (
                    <Input {...field} type="datetime-local" />
                  )}
                </Field>
                <FormErrorMessage>{errors.startTime}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!(errors.endTime && touched.endTime)}>
                <FormLabel>End Time</FormLabel>
                <Field name="endTime">
                  {({ field }: FieldProps) => (
                    <Input {...field} type="datetime-local" />
                  )}
                </Field>
                <FormErrorMessage>{errors.endTime}</FormErrorMessage>
              </FormControl>
            </VStack>

            <FormControl isInvalid={!!(errors.location && touched.location)}>
              <FormLabel>Location</FormLabel>
              <Field name="location">
                {({ field }: FieldProps) => (
                  <Input {...field} placeholder="e.g., Main Lobby, Room 101" />
                )}
              </Field>
              <FormErrorMessage>{errors.location}</FormErrorMessage>
            </FormControl>

            <HStack spacing={4} justify="flex-end" pt={4}>
              <Button variant="outline" color="white" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText={shift ? "Updating..." : "Creating..."}
              >
                {shift ? "Update Shift" : "Create Shift"}
              </Button>
            </HStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default ShiftForm;
