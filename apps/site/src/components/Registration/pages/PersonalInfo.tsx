import { Box, HStack, VStack } from "@chakra-ui/react";
import { RegistrationValues } from "../schema";
import {
  FormCheckboxGroup,
  FormMultiSelectMenu,
  FormRadioGroup,
  FormRequiredCheckbox,
  FormTextField
} from "@rp/shared";

const PersonalInfo = () => (
  <VStack gap={8} w="100%" h="100%" justifyContent="space-between">
    <HStack gap={16} w="100%" alignItems="start">
      <FormTextField<RegistrationValues, "name">
        name="name"
        label="Name"
        placeholder="Preferred Name"
        isRequired
      />

      <FormTextField<RegistrationValues, "email">
        name="email"
        label="Email"
        placeholder="Email"
        isRequired
      />
    </HStack>
    <HStack gap={16} w="100%" alignItems="start">
      <VStack gap={8} h="100%" flex={1} justifyContent="space-between">
        <FormRadioGroup<RegistrationValues, "gender">
          name="gender"
          label="Gender"
          options={["Man", "Woman", "Non-binary", "Prefer not to say"]}
          isRequired
          customLabel="Prefer to self-describe"
        />

        <FormCheckboxGroup<RegistrationValues, "ethnicity">
          name="ethnicity"
          label="Race and/or Ethnicity"
          options={[
            "American Indian or Alaska Native",
            "Asian",
            "Black or African American",
            "Hispanic or Latino/a/x",
            "Middle Eastern or North African",
            "Native Hawaiian or Other Pacific Islander",
            "White",
            "Prefer not to answer"
          ]}
          customLabel="Other"
        />
      </VStack>
      <VStack gap={8} flex={1} justifyContent="space-between" h="100%">
        <FormCheckboxGroup<RegistrationValues, "allergies">
          name="allergies"
          label="Allergies"
          options={[
            "Peanuts",
            "Tree Nuts",
            "Dairy",
            "Eggs",
            "Soy",
            "Shellfish",
            "Fish",
            "Sesame"
          ]}
          customLabel="Other"
        />

        <FormCheckboxGroup<RegistrationValues, "dietaryRestrictions">
          name="dietaryRestrictions"
          label="Dietary Restrictions"
          options={[
            "Vegetarian",
            "Vegan",
            "Pescetarian",
            "Gluten-Free",
            "Kosher",
            "Halal",
            "Dairy-Free",
            "No Beef"
          ]}
          customLabel="Other"
        />
      </VStack>
    </HStack>
    <FormMultiSelectMenu<RegistrationValues, "howDidYouHear">
      name="howDidYouHear"
      label="How did you hear about us?"
      placeholder="Select where you heard about the event"
      options={[
        "Word of mouth",
        "In-class marketing",
        "On campus events",
        "Instagram",
        "Email",
        "Linkedin",
        "Flyers",
        "Discord",
        "Other"
      ].map((source) => ({ label: source, value: source }))}
      isRequired
    />

    <FormMultiSelectMenu<RegistrationValues, "tags">
      name="tags"
      label="Which events types are you interested in?"
      placeholder="Select the types of events you are interested in"
      options={["placeholder1", "placeholder2"].map((school) => ({
        label: school,
        value: school
      }))}
      isRequired
    />

    <Box alignSelf="end">
      <FormRequiredCheckbox<RegistrationValues, "over18">
        name="over18"
        label="I certify that I am at least 18 years old"
      />
    </Box>
  </VStack>
);

export default PersonalInfo;
