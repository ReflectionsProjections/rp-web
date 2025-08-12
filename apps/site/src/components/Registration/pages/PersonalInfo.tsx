import { Box, HStack, VStack } from "@chakra-ui/react";
import { RegistrationValues } from "../schema";
import {
  FormCheckboxGroup,
  FormMultiSelectMenu,
  FormRadioGroup,
  FormRequiredCheckbox,
  FormTextField
} from "@rp/shared";

export const NameField = () => (
  // <Box p={4} background="blackAlpha.300" borderRadius="3xl">
  <FormTextField<RegistrationValues, "name">
    name="name"
    label="Name"
    placeholder="Preferred Name"
    isRequired
  />
  // </Box>
);

export const EmailField = () => (
  <FormTextField<RegistrationValues, "email">
    name="email"
    label="Email"
    placeholder="Email"
    type="email"
    isRequired
  />
);

export const GenderField = () => (
  <FormRadioGroup<RegistrationValues, "gender", "genderOther">
    name="gender"
    label="Gender"
    options={["Man", "Woman", "Non-binary", "Prefer not to say"]}
    isRequired
    custom={{ name: "genderOther", label: "Prefer to self-describe" }}
  />
);

export const EthnicityField = () => (
  <FormCheckboxGroup<RegistrationValues, "ethnicity", "ethnicityOther">
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
    custom={{ name: "ethnicityOther", label: "Other" }}
  />
);

export const AllergiesField = () => (
  <FormCheckboxGroup<RegistrationValues, "allergies", "allergiesOther">
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
    custom={{ name: "allergiesOther", label: "Other" }}
  />
);

export const DietaryRestrictionsField = () => (
  <FormCheckboxGroup<RegistrationValues, "dietaryRestrictions", "dietaryOther">
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
    custom={{ name: "dietaryOther", label: "Other" }}
  />
);

export const HowDidYouHearField = () => (
  <FormMultiSelectMenu<RegistrationValues, "howDidYouHear">
    name="howDidYouHear"
    label="How did you hear about us?"
    placeholder="Select where you heard about us"
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
);

export const TagsField = () => (
  <FormMultiSelectMenu<RegistrationValues, "tags">
    name="tags"
    label="Which events types are you interested in?"
    placeholder="Select your interests"
    options={["placeholder1", "placeholder2"].map((school) => ({
      label: school,
      value: school
    }))}
    isRequired
  />
);

export const Over18Checkbox = () => (
  <FormRequiredCheckbox<RegistrationValues, "over18">
    name="over18"
    label="I certify that I am at least 18 years old"
  />
);

const PersonalInfo = () => (
  <VStack gap={8} w="100%" h="100%" justifyContent="space-between">
    <HStack gap={16} w="100%" alignItems="start">
      <NameField />
      <EmailField />
    </HStack>
    <HStack gap={16} w="100%" alignItems="start">
      <VStack gap={8} h="100%" flex={1} justifyContent="space-between">
        <GenderField />
        <EthnicityField />
      </VStack>
      <VStack gap={8} flex={1} justifyContent="space-between" h="100%">
        <AllergiesField />
        <DietaryRestrictionsField />
      </VStack>
    </HStack>
    <HowDidYouHearField />
    <TagsField />
    <Box alignSelf="end">
      <Over18Checkbox />
    </Box>
  </VStack>
);

export default PersonalInfo;
