import * as yup from "yup";

export type EmailFormValues = {
  recipients: string;
  subject: string;
  body: string;
};

export const EmailFormSchema: yup.Schema<EmailFormValues> = yup.object({
  recipients: yup.string().required("Recipient group is required"),
  subject: yup.string().required("Email subject is required"),
  body: yup.string().required("Email body is required")
});

export const EmailFormInitialValues: EmailFormValues = {
  recipients: "",
  subject: "",
  body: ""
};
