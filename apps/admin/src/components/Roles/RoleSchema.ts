import { Config } from "@/config";
import { CommitteeType, Role } from "@rp/shared";
import * as yup from "yup";

export type RoleFormValues = {
  email: string;
  name: string;
  team: CommitteeType | "";
  roles: Role[];
};

export const RoleFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Please enter a valid email address")
    .required("Email is required"),
  name: yup
    .string()
    .trim()
    .min(1, "Name is required")
    .required("Name is required"),
  team: yup
    .mixed<CommitteeType>()
    .oneOf(Config.COMMITTEE_TYPES)
    .required("Team is required"),
  roles: yup
    .array()
    .of(yup.string().oneOf(["ADMIN", "STAFF", "CORPORATE", "PUZZLEBANG"]))
    .min(1, "At least one role must be selected")
    .required("Roles are required")
}) as yup.Schema<RoleFormValues>;

export const RoleFormInitialValues: RoleFormValues = {
  email: "",
  name: "",
  team: "",
  roles: ["STAFF"]
};
