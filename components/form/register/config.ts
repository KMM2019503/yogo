import type { RegisterStep } from "./types";

export const registerSteps: RegisterStep[] = [
  {
    id: "user",
    title: "User",
    description: "Review your account details from the previous step.",
    fields: ["name", "email", "phone"],
  },
  {
    id: "userInfo",
    title: "User Info",
    description: "Add your personal profile and emergency contact details.",
    fields: [
      "dob",
      "gender",
      "occupation",
      "address",
      "emergencyContactName",
      "emergencyContactNumber",
    ],
  },
  {
    id: "medical",
    title: "Medical",
    description: "Share insurance details and relevant medical background.",
    fields: [
      "insuranceProvider",
      "insurancePolicyNumber",
      "allergies",
      "currentMedication",
    ],
  },
  {
    id: "verification",
    title: "Verify",
    description: "Add identification details to complete your profile.",
    fields: [
      "indentificationType",
      "indentificationNumber",
      "indentificationDocument",
    ],
  },
  {
    id: "consent",
    title: "Consent",
    description: "Confirm required consents and privacy acknowledgment.",
    fields: ["treatmentConsent", "disclosureConsent", "privacyConsent"],
  },
];

export const registerFieldStyles = {
  input:
    "h-11 rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0",
  disabledInput: "bg-slate-100 text-slate-500",
  phoneInput:
    "flex h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 disabled:opacity-100",
  textarea:
    "min-h-[110px] rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-500 focus-visible:ring-offset-0",
  dateInput:
    "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
};
