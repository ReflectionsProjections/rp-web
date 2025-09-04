import * as yup from "yup";

export type EmailFormValues = {
  recipients: string;
  subject: string;
  body: string;
  isMobileNotification: boolean;
  template: string;
};

export const EmailFormSchema: yup.Schema<EmailFormValues> = yup.object({
  recipients: yup.string().required("Recipient group is required"),
  subject: yup
    .string()
    .required("Email subject is required")
    .when("isMobileNotification", {
      is: false,
      then: (schema) =>
        schema.matches(
          /^[^!]*$/,
          "The subject line cannot contain exclamation marks; UIUC email filters will block it from sending!"
        ),
      otherwise: (schema) => schema
    }),
  body: yup.string().required("Email body is required"),
  isMobileNotification: yup.boolean().required(),
  template: yup.string().required()
});

export const EmailFormInitialValues: EmailFormValues = {
  recipients: "",
  subject: "",
  body: "",
  isMobileNotification: false,
  template: "main"
};
