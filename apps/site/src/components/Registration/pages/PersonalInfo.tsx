import { VStack } from "@chakra-ui/react";
import { RegistrationValues } from "../schema";
import { FormCheckboxGroup, FormRadioGroup, FormTextField } from "@rp/shared";

const PersonalInfo = () => (
  <VStack spacing={5} align="stretch">
    <FormTextField<RegistrationValues, "name">
      name="name"
      label="Preferred Name"
      placeholder="Preferred Name"
      isRequired
    />

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
        "Prefer not to say"
      ]}
      isRequired
      customLabel="Other"
    />
  </VStack>
);

export default PersonalInfo;
