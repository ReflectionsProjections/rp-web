import { Config } from "@/config";
import { CommitteeType } from "@rp/shared";
import * as yup from "yup";

export type RoleFormValues = {
  email: string;
  team: CommitteeType | "";
};

export const RoleFormSchema: yup.Schema<RoleFormValues> = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  team: yup
    .mixed<CommitteeType>()
    .oneOf(Config.COMMITTEE_TYPES)
    .required("Team is required")
});

export const RoleFormInitialValues: RoleFormValues = { email: "", team: "" };
