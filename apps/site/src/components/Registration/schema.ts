import { RegistrationDraft, UploadFile } from "@rp/shared";
import * as yup from "yup";

export type RegistrationValues = Omit<
  RegistrationDraft,
  "userId" | "resume"
> & {
  resume: UploadFile | null;
  over18: boolean;
};

export const initialValues = (): RegistrationValues => ({
  name: "",
  email: "",
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
  resume: null,
  personalLinks: [],
  howDidYouHear: [],
  tags: [],
  isInterestedPuzzleBang: false,
  isInterestedMechMania: false,
  over18: false
});

export const finalRegistrationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
  ethnicity: yup.array().of(yup.string().required()).required(),
  dietaryRestrictions: yup.array().of(yup.string().required()).required(),
  allergies: yup.array().of(yup.string().required()).required(),
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
  isInterestedPuzzleBang: yup.boolean().required(),
  isInterestedMechMania: yup.boolean().required(),
  school: yup.string().required("School is required"),
  educationLevel: yup.string().required("Education Level is required"),
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

export const registrationSchema = finalRegistrationSchema.shape({
  genderOther: yup.string().nonNullable(),
  ethnicityOther: yup.string().nonNullable(),
  dietaryOther: yup.string().nonNullable(),
  allergiesOther: yup.string().nonNullable(),
  educationOther: yup.string().nonNullable(),
  resume: yup.object().required("Please upload a resume"),
  over18: yup.boolean().oneOf([true], "You must be over 18").required()
});
