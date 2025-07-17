import {
  FormMultiSelectMenu,
  FormRadioGroup,
  FormRequiredCheckbox
} from "@rp/shared";
import { RegistrationValues } from "../schema";

const EventInfo = () => (
  <>
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

    <FormRadioGroup<RegistrationValues, "howDidYouHear">
      name="howDidYouHear"
      label="How did you hear about Reflection | Projections?"
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

    <FormRequiredCheckbox<RegistrationValues, "over18">
      name="over18"
      label="You must be at least 18 years old to register for Reflections | Projections"
      checkboxLabel="I certify that I am at least 18 years old"
    />
  </>
);

export default EventInfo;
