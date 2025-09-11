import * as yup from "yup";

export type EmailFormValues = {
  recipients?: string;
  individualRecipient?: string;
  subject: string;
  body: string;
  isMobileNotification: boolean;
  isIndividualEmail: boolean;
  template: string;
};

export const EmailFormSchema: yup.Schema<EmailFormValues> = yup.object({
  recipients: yup.string().when("isIndividualEmail", {
    is: false,
    then: (schema) =>
      schema.required("Recipient or subscription group is required"),
    otherwise: (schema) => schema.notRequired()
  }),
  individualRecipient: yup.string().when("isIndividualEmail", {
    is: true,
    then: (schema) =>
      schema
        .email("Recipient must be a valid email")
        .required("Recipient or subscription group is required"),
    otherwise: (schema) => schema.notRequired()
  }),
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
  isIndividualEmail: yup.boolean().required(),
  template: yup.string().required()
});

export const EmailFormInitialValues: EmailFormValues = {
  recipients: "",
  individualRecipient: "",
  subject: "",
  body: "",
  isMobileNotification: false,
  isIndividualEmail: false,
  template: "main"
};
