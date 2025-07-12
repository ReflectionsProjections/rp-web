import {
  FormCheckboxGroup,
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
      options={schools}
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

    <FormSelectMenu<RegistrationValues, "major">
      name="major"
      label="What is your current (or intended) major?"
      placeholder="Select your current (or intended) major"
      options={majors}
      isRequired
    />

    <FormTextField<RegistrationValues, "graduationYear">
      name="graduationYear"
      label="When do you intend to graduate?"
      placeholder="Graduation Year"
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
  </>
);

export default CareerInfo;
