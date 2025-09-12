import {
  FormCheckbox,
  FormCheckboxGroup,
  FormFileUpload,
  FormLinks,
  FormRadioGroup,
  FormSelectMenu,
  FormTextField,
  majors,
  minors,
  schools,
  graduationDates,
  educationLevels
} from "@rp/shared";
import { RegistrationValues } from "./schema";
import { employmentOpportunities } from "@rp/shared";

export const NameField = () => (
  <FormTextField<RegistrationValues, "name">
    name="name"
    label="Name"
    placeholder="Preferred Name"
    maxLength={50}
    isRequired
  />
);

export const EmailField = () => (
  <FormTextField<RegistrationValues, "email">
    name="email"
    label="Email"
    placeholder="Email"
    type="email"
    maxLength={256}
    isRequired
  />
);

export const GenderField = () => (
  <FormRadioGroup<RegistrationValues, "gender", "genderOther">
    name="gender"
    label="Gender"
    options={["Man", "Woman", "Non-binary", "Prefer not to say"]}
    custom={{
      name: "genderOther",
      label: "Prefer to self-describe",
      maxLength: 50
    }}
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
    custom={{ name: "ethnicityOther", label: "Other", maxLength: 50 }}
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
    custom={{ name: "allergiesOther", label: "Other", maxLength: 50 }}
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
    custom={{ name: "dietaryOther", label: "Other", maxLength: 50 }}
  />
);

export const HowDidYouHearField = () => (
  <FormSelectMenu<RegistrationValues, "howDidYouHear">
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
    isMulti
  />
);

export const TagsField = () => (
  <FormSelectMenu<RegistrationValues, "tags">
    name="tags"
    label="What kinds of events are you interested in?"
    placeholder="Select your interests"
    options={[
      "Career Readiness",
      "AI",
      "Research",
      "Interactive Events",
      "HCI",
      "Ethics",
      "Art/Media",
      "Autonomous Vehicles",
      "Networking",
      "Company Talk",
      "Cybersecurity"
    ].map((interest) => ({
      label: interest,
      value: interest
    }))}
    isRequired
    isMulti
  />
);

export const Over18Checkbox = () => (
  <FormCheckbox<RegistrationValues, "over18">
    name="over18"
    label="I certify that I am at least 18 years old"
    isRequired
  />
);

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
    options={educationLevels}
    isRequired
    custom={{ name: "educationOther", label: "Other", maxLength: 50 }}
  />
);

export const MajorsField = () => (
  <FormSelectMenu<RegistrationValues, "majors">
    name="majors"
    label="What is your current (or intended) major?"
    placeholder="Select your current (or intended) major(s)"
    options={majors.map((major) => ({ label: major, value: major }))}
    isRequired
    isMulti
    maxSelections={5}
  />
);

export const MinorsField = () => (
  <FormSelectMenu<RegistrationValues, "minors">
    name="minors"
    label="What is your current (or intended) minor?"
    placeholder="Select your current (or intended) minor(s)"
    options={minors.map((minor) => ({ label: minor, value: minor }))}
    isMulti
    maxSelections={5}
  />
);

export const GraduationYearField = () => (
  <FormSelectMenu<RegistrationValues, "graduationYear">
    name="graduationYear"
    label="When do you intend to graduate?"
    placeholder="Graduation year"
    options={graduationDates.map((date) => ({ label: date, value: date }))}
    isRequired
  />
);

export const OpportunitiesField = () => (
  <FormCheckboxGroup<RegistrationValues, "opportunities">
    name="opportunities"
    label="What opportunities are you open to?"
    options={employmentOpportunities}
  />
);

export const ResumeField = () => (
  <FormFileUpload<RegistrationValues, "resume">
    name="resume"
    label="Resume"
    helperText="Your resume will be shared with our corporate sponsors. You may return to this page at any time to update it."
    accept=".pdf,.docx"
    maxFileSize={6 * 1024 * 1024}
  />
);

export const PersonalLinksField = () => (
  <FormLinks<RegistrationValues, "personalLinks">
    name="personalLinks"
    label="Personal Links"
    maxLinks={3}
  />
);

export const PuzzleBangInterest = () => (
  <FormCheckbox<RegistrationValues, "isInterestedPuzzleBang">
    name="isInterestedPuzzleBang"
    label="Are you interested in participating in PuzzleBang?"
  />
);

export const MechManiaInterest = () => (
  <FormCheckbox<RegistrationValues, "isInterestedMechMania">
    name="isInterestedMechMania"
    label="Are you interested in participating in MechMania?"
  />
);
