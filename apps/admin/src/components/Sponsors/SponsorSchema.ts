import * as yup from "yup";

export type SponsorFormValues = {
  name: string;
  email: string;
};

export const SponsorFormSchema: yup.Schema<SponsorFormValues> = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email must be valid").required("Email is required")
});

export const SponsorFormInitialValues: SponsorFormValues = {
  name: "",
  email: ""
};
