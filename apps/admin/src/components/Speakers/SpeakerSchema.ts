import * as yup from "yup";

export interface SpeakerFormValues {
  name: string;
  title: string;
  bio: string;
  eventTitle: string;
  eventDescription: string;
  imgUrl: string;
}

export const SpeakerFormInitialValues: SpeakerFormValues = {
  name: "",
  title: "",
  bio: "",
  eventTitle: "N/A",
  eventDescription: "N/A",
  imgUrl: ""
};

export const SpeakerFormSchema = yup.object({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  bio: yup.string().required("Bio is required"),
  eventTitle: yup.string().required("Event title is required"),
  eventDescription: yup.string().required("Event description is required"),
  imgUrl: yup
    .string()
    .url("Must be a valid URL")
    .required("Image URL is required")
});
