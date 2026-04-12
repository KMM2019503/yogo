import type { Dispatch, SetStateAction } from "react";
import { z } from "zod";

import { PatientFormValidation } from "@/lib/validation";

export type RegisterFormValues = z.infer<typeof PatientFormValidation>;

export type RegisterStepId =
  | "user"
  | "userInfo"
  | "medical"
  | "verification"
  | "consent";

export type RegisterStep = {
  id: RegisterStepId;
  title: string;
  description: string;
  fields: (keyof RegisterFormValues)[];
};

export interface RegisterFormProps {
  user: User;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}
