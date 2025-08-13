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
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  genderOther: yup.string().nonNullable(),
  ethnicity: yup.array().of(yup.string().required()).required(),
  ethnicity_other: yup.string().nonNullable(),
  dietaryRestrictions: yup.array().of(yup.string().required()).required(),
  dietary_other: yup.string().nonNullable(),
  allergies: yup.array().of(yup.string().required()).required(),
  allergies_other: yup.string().nonNullable(),
  howDidYouHear: yup
    .array()
    .of(yup.string().required())
    .required()
    .min(1, "Please select at least one"),
  tags: yup
    .array()
    .of(yup.string().required())
    .required()
    .min(1, "Please select at least one"),
  over18: yup.boolean().oneOf([true], "You must be over 18").required(),
  school: yup.string().required("School is required"),
  educationLevel: yup.string().required("Education Level is required"),
  educationOther: yup.string().nonNullable(),
  majors: yup
    .array()
    .of(yup.string().required())
    .required()
    .min(1, "Please select at least one"),
  minors: yup.array().of(yup.string().required()).required(),
  graduationYear: yup
    .string()
    .required("Graduation year is required")
    .test("valid-year", "Please enter a valid year", (value) => {
      if (!value) return false;
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      return year >= 1985 && year <= currentYear + 10;
    }),
  opportunities: yup.array().of(yup.string().required()).required(),
  resume: yup.string().required("Please upload a resume"),
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
