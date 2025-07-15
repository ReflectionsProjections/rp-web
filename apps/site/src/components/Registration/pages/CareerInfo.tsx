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

const CareerInfo = () => (
  <>
    <FormSelectMenu<RegistrationValues, "school">
      name="school"
      label="What school do you attend?"
      placeholder="Select the school you attend"
      options={schools.map((school) => ({ label: school, value: school }))}
      isRequired
    />

    <FormRadioGroup<RegistrationValues, "educationLevel">
      name="educationLevel"
      label="What is your highest level of education (currently pursuing or completed)?"
      options={[
        "High School",
        "Associate Degree",
        "Bachelor's Degree",
        "Master's Degree",
        "PhD or Doctorate"
      ]}
      customLabel="Other"
      isRequired
    />

    <FormMultiSelectMenu<RegistrationValues, "majors">
      name="majors"
      label="What is your current (or intended) major?"
      placeholder="Select your current (or intended) major(s)"
      options={majors.map((major) => ({ label: major, value: major }))}
      isRequired
    />

    <FormMultiSelectMenu<RegistrationValues, "minors">
      name="minors"
      label="What is your current (or intended) minor? (if applicable)"
      placeholder="Select your current (or intended) minor(s)"
      options={majors.map((major) => ({ label: major, value: major }))}
    />

    <FormTextField<RegistrationValues, "graduationYear">
      name="graduationYear"
      label="When do you intend to graduate?"
      placeholder="Graduation year"
      isRequired
    />

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

    <FormFileUpload<RegistrationValues, "resume">
      name="resume"
      label="Resume"
    />

    <FormLinks<RegistrationValues, "personalLinks">
      name="personalLinks"
      label="Personal Links"
      maxLinks={3}
    />
  </>
);

export default CareerInfo;
