import {
  FormCheckboxGroup,
  FormFileUpload,
  FormLinks,
  FormMultiSelectMenu,
  FormRadioGroup,
  FormSelectMenu,
  FormTextField,
  majors,
  schools
} from "@rp/shared";
import { RegistrationValues } from "../schema";
import { HStack, VStack } from "@chakra-ui/react";

export const SchoolField = () => (
  <FormSelectMenu<RegistrationValues, "school">
    name="school"
    label="What school do you attend?"
    placeholder="Select the school you attend"
    options={schools.map((school) => ({ label: school, value: school }))}
    isRequired
  />
);

export const EducationLevelField = () => (
  <FormRadioGroup<RegistrationValues, "educationLevel", "educationOther">
    name="educationLevel"
    label="What is your highest level of education (currently pursuing or completed)?"
    options={[
      "High School",
      "Associate Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD or Doctorate"
    ]}
    isRequired
    custom={{ name: "educationOther", label: "Other" }}
  />
);

export const MajorsField = () => (
  <FormMultiSelectMenu<RegistrationValues, "majors">
    name="majors"
    label="What is your current (or intended) major?"
    placeholder="Select your current (or intended) major(s)"
    options={majors.map((major) => ({ label: major, value: major }))}
    isRequired
  />
);

export const MinorsField = () => (
  <FormMultiSelectMenu<RegistrationValues, "minors">
    name="minors"
    label="What is your current (or intended) minor?"
    placeholder="Select your current (or intended) minor(s)"
    options={majors.map((major) => ({ label: major, value: major }))}
  />
);

export const GraduationYearField = () => (
  <FormTextField<RegistrationValues, "graduationYear">
    name="graduationYear"
    label="When do you intend to graduate?"
    placeholder="Graduation year"
    isRequired
  />
);

export const OpportunitiesField = () => (
  <FormCheckboxGroup<RegistrationValues, "opportunities">
    name="opportunities"
    label="What opportunities are you open to?"
    options={[
      "Full-Time",
      "Summer Internship",
      "Fall Internship",
      "Spring Internship",
      "Fall Co-op",
      "Spring Co-op",
      "Graduate/Postdoc Research",
      "Graduate/Postdoc Internship"
    ]}
  />
);

export const ResumeField = () => (
  <FormFileUpload<RegistrationValues, "resume"> name="resume" label="Resume" />
);

export const PersonalLinksField = () => (
  <FormLinks<RegistrationValues, "personalLinks">
    name="personalLinks"
    label="Personal Links"
    maxLinks={3}
  />
);

const CareerInfo = () => (
  <VStack gap={8} w="100%" h="100%" justifyContent="space-between">
    <HStack gap={16} w="100%" alignItems="start">
      <SchoolField />
      <GraduationYearField />
    </HStack>
    <EducationLevelField />
    <HStack gap={16} w="100%" alignItems="start">
      <MajorsField />
      <MinorsField />
    </HStack>
    <OpportunitiesField />
    <HStack gap={16} w="100%" alignItems="start">
      <PersonalLinksField />
      <ResumeField />
    </HStack>
  </VStack>
);

export default CareerInfo;
