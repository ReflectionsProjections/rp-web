import { Event, EventType } from "@rp/shared";
import * as yup from "yup";
import moment from "moment-timezone";

// Set timezone to Chicago (Central Time)
moment.tz.setDefault("America/Chicago");

export type EventFormValues = Omit<Event, "eventId" | "attendanceCount">;

export const EventFormSchema: yup.Schema<EventFormValues> = yup.object({
  name: yup.string().required("Event name is required"),
  isVirtual: yup.boolean().required(),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  points: yup.number().min(0, "Points must be non-negative").required(),
  imageUrl: yup.string().url("Must be a valid URL").required().nullable(),
  description: yup.string().required("Description is required"),
  location: yup.string().default(""),
  eventType: yup
    .mixed<EventType>()
    .oneOf(["SPEAKER", "CORPORATE", "SPECIAL", "PARTNERS", "MEALS", "CHECKIN"])
    .required(),
  isVisible: yup.boolean().required(),
  tags: yup.array().of(yup.string().required()).default([])
});

export const EventFormInitialValues: EventFormValues = {
  name: "",
  isVirtual: true,
  startTime: moment.tz("America/Chicago").format("YYYY-MM-DDTHH:mm"),
  endTime: moment
    .tz("America/Chicago")
    .add(1, "hour")
    .format("YYYY-MM-DDTHH:mm"),
  points: 0,
  description: "",
  imageUrl: "",
  location: "",
  eventType: "SPEAKER",
  isVisible: true,
  tags: []
};
