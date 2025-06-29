import { Config } from "@/config";
import { CommitteeType, Role } from "@rp/shared";
import * as yup from "yup";

export type RoleFormValues = {
  email: string;
  team: CommitteeType | "";
  roles: Role[];
};

export const RoleFormSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
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
  team: "",
  roles: ["STAFF"]
};
