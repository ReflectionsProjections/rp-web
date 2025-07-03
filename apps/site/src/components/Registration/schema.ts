import { RegistrationDraft } from "@rp/shared";
import * as yup from "yup";

export type RegistrationValues = RegistrationDraft & { over18: boolean };

export const registrationSchema: yup.Schema<RegistrationValues> = yup.object({
  name: yup.string().required("Required"),
  dietaryRestrictions: yup.array().of(yup.string().required()).required(),
  allergies: yup.array().of(yup.string().required()).required(),
  school: yup.string().required("Required"),
  educationLevel: yup.string().required("Required"),
  major: yup.string().required("Required"),
  graduationYear: yup.string().required("Required"),
  opportunities: yup.array().of(yup.string().required()).required(),
  hasResume: yup.boolean().required(),
  personalLinks: yup.array().of(yup.string().url("Invalid URL").required()).required().max(5),
  gender: yup.string().required(),
  ethnicity: yup.array().of(yup.string().required()).required(),
  howDidYouHear: yup.array().of(yup.string().required()).required().min(1),
  tags: yup.array().of(yup.string().required()).required(),
  over18: yup.boolean().oneOf([true], "You must be over 18").required(),
});
