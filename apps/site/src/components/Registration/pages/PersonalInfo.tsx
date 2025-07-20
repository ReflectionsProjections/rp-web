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
  <VStack gap={12}>
    <HStack align="start" gap={16} w="100%">
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

    <HStack align="start" gap={12}>
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
          "White"
        ]}
        customLabel="Other"
      />
    </HStack>

    <HStack align="start" gap={12}>
      <FormCheckboxGroup<RegistrationValues, "dietaryRestrictions">
        name="dietaryRestrictions"
        label="Dietary Restrictions"
        options={[
          "Vegetarian",
          "Vegan",
          "Gluten-Free",
          "Kosher",
          "Halal",
          "Dairy-Free",
          "No Beef"
        ]}
        customLabel="Other"
      />

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
    </HStack>

    <HStack align="start" gap={12}>
        <FormRadioGroup<RegistrationValues, "howDidYouHear">
          name="howDidYouHear"
          label="How did you hear about Reflection | Projections?"
          options={[
            "Word of mouth",
            "In-class marketing",
            "On campus events",
            "Instagram",
            "Email",
            "Linkedin",
            "Flyers"
          ]}
          customLabel="Other"
          isRequired
        />
      <FormMultiSelectMenu<RegistrationValues, "tags">
        name="tags"
        label="Which types of events are you interested in?"
        placeholder="Select the types of events you are interested in"
        options={["placeholder1", "placeholder2"].map((school) => ({
          label: school,
          value: school
        }))}
        isRequired
      />

    </HStack>

<Box alignSelf="end" justifySelf="end">
    <FormRequiredCheckbox<RegistrationValues, "over18">
      name="over18"
      label="You must be at least 18 years old to register for Reflections | Projections"
      checkboxLabel="I certify that I am at least 18 years old"
    />
  </Box>
  </VStack>
);

export default PersonalInfo;
