import { RegistrationDraft } from "@rp/shared";
import * as yup from "yup";

export type RegistrationValues = RegistrationDraft & { over18: boolean };

export const initialValues: RegistrationValues = {
  name: "",
  gender: "",
  ethnicity: [],
  dietaryRestrictions: [],
  allergies: [],
  school: "",
  educationLevel: "",
  major: "",
  graduationYear: "",
  opportunities: [],
  hasResume: false,
  personalLinks: [],
  howDidYouHear: [],
  tags: [],
  over18: false
};

const page1Schema = yup.object({
  name: yup.string().required("Required"),
  gender: yup.string().required(),
  ethnicity: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one option")
    .required(),
  dietaryRestrictions: yup.array().of(yup.string().required()).required(),
  allergies: yup.array().of(yup.string().required()).required()
});

const page2Schema = yup.object({
  school: yup.string().required("Required"),
  educationLevel: yup.string().required("Required"),
  major: yup.string().required("Required"),
  graduationYear: yup.string().required("Required"),
  opportunities: yup.array().of(yup.string().required()).required(),
  hasResume: yup.boolean().required(),
  personalLinks: yup
    .array()
    .of(yup.string().url("Invalid URL").required())
    .required()
    .max(5)
});

const page3Schema = yup.object({
  howDidYouHear: yup.array().of(yup.string().required()).required().min(1),
  tags: yup.array().of(yup.string().required()).required(),
  over18: yup.boolean().oneOf([true], "You must be over 18").required()
});

const registrationSchemas = [page1Schema, page2Schema, page3Schema];

export function getRegistrationSchemaForPage(currentPage: number) {
  const schemasToMerge = registrationSchemas.slice(0, currentPage + 1);
  return schemasToMerge.reduce(
    (acc, schema) => acc.concat(schema),
    yup.object({})
  );
}
