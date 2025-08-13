import { Registration } from "@rp/shared";
import * as yup from "yup";

export type RegistrationValues = Registration & { over18: boolean };

export const initialValues = (
  name: string,
  email: string
): RegistrationValues => ({
  name,
  email,
  gender: "",
  genderOther: "",
  ethnicity: [],
  ethnicityOther: "",
  dietaryRestrictions: [],
  dietaryOther: "",
  allergies: [],
  allergiesOther: "",
  school: "",
  educationLevel: "",
  educationOther: "",
  majors: [],
  minors: [],
  graduationYear: "",
  opportunities: [],
  resume: "",
  personalLinks: [],
  howDidYouHear: [],
  tags: [],
  isInterestedPuzzleBang: false,
  isInterestedMechMania: false,
  over18: false
});

export const registrationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  gender: yup.string().required(),
  genderOther: yup.string().nonNullable(),
  ethnicity: yup.array().of(yup.string().required()).required(),
  ethnicity_other: yup.string().nonNullable(),
  dietaryRestrictions: yup.array().of(yup.string().required()).required(),
  dietary_other: yup.string().nonNullable(),
  allergies: yup.array().of(yup.string().required()).required(),
  allergies_other: yup.string().nonNullable(),
  howDidYouHear: yup.array().of(yup.string().required()).required(),
  tags: yup.array().of(yup.string().required()).required(),
  over18: yup.boolean().oneOf([true], "You must be over 18").required(),
  school: yup.string().required("Required"),
  educationLevel: yup.string().required("Required"),
  educationOther: yup.string().nonNullable(),
  majors: yup.array().of(yup.string().required()).min(1).required(),
  minors: yup.array().of(yup.string().required()).required(),
  graduationYear: yup
    .string()
    .required("Required")
    .test("valid-year", "Enter a valid year", (value) => {
      if (!value) return false;
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      return year >= 1985 && year <= currentYear + 10;
    }),
  opportunities: yup.array().of(yup.string().required()).required(),
  resume: yup.string(),
  personalLinks: yup
    .array()
    .of(
      yup
        .string()
        .url("Invalid URL")
        .notOneOf(
          ["https://linkedin.com/in/", "https://github.com/"],
          "Username is required"
        )
        .required()
    )
    .required()
    .max(5)
});
