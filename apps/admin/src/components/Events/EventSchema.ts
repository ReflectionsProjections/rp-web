import { Event, EventType } from "@rp/shared";
import * as yup from "yup";

export type EventFormValues = Omit<Event, "eventId" | "attendanceCount">;

export const EventFormSchema: yup.Schema<EventFormValues> = yup.object({
  name: yup.string().required("Event name is required"),
  isVirtual: yup.boolean().required(),
  startTime: yup
    .string()
    .required("Start time is required"),
  endTime: yup
    .string()
    .required("End time is required"),
  points: yup.number().min(0, "Points must be non-negative").required(),
  imageUrl: yup.string().url("Must be a valid URL").default(""),
  description: yup.string().required("Description is required"),
  location: yup.string().default(""),
  eventType: yup
    .mixed<EventType>()
    .oneOf(["SPEAKER", "CORPORATE", "SPECIAL", "PARTNERS", "MEALS", "CHECKIN"])
    .required(),
  isVisible: yup.boolean().required()
});

export const EventFormInitialValues: EventFormValues = {
  name: "",
  isVirtual: true,
  startTime: "",
  endTime: "",
  points: 0,
  description: "",
  imageUrl: "",
  location: "",
  eventType: "SPEAKER",
  isVisible: true
};
