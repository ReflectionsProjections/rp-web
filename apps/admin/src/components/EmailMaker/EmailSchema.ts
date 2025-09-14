import * as yup from "yup";

export type EmailFormValues = {
  recipient: string;
  subject: string;
  body: string;
  isMobileNotification: boolean;
  isIndividualEmail: boolean;
  template: string;
};

export const EmailFormSchema: yup.Schema<EmailFormValues> = yup.object({
  recipient: yup
    .string()
    .defined()
    .when(
      ["isMobileNotification", "isIndividualEmail"],
      ([isMobileNotification, isIndividualEmail], schema: yup.StringSchema) => {
        // if we're looking at the mobile view, ignore the individual-email validation entirely
        if (isMobileNotification) {
          return schema.required("Recipient or subscription group is required");
        }
        // else -- if we're looking at the email view
        if (isIndividualEmail) {
          return schema
            .required("Recipient or subscription group is required")
            .email("Recipient must be a valid email");
        }
        return schema.required("Recipient or subscription group is required");
      }
    ),
  subject: yup
    .string()
    .required("Email subject is required")
    .when("isMobileNotification", {
      is: false,
      then: (schema) =>
        schema.matches(
          /^[^!]*$/,
          "The subject line cannot contain exclamation marks; UIUC email filters will block it from sending"
        ),
      otherwise: (schema) => schema
    }),
  body: yup.string().required("Message body is required"),
  isMobileNotification: yup.boolean().required(),
  isIndividualEmail: yup.boolean().required(),
  template: yup.string().required()
});

export const EmailFormInitialValues: EmailFormValues = {
  recipient: "",
  subject: "",
  body: "",
  isMobileNotification: false,
  isIndividualEmail: false,
  template: "main"
};
