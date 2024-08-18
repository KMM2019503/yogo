/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "male" | "female" | "other" | "gay";
declare type Status = "pending" | "schedule" | "cancel";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  dob: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  indentificationType: string | undefined;
  indentificationNumber: string | undefined;
  indentificationDocument: FormData | undefined;
  privacyConsent: boolean;
  treatmentConsent: boolean;
  disclosureConsent: boolean;
}

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  doctor: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  userId: string;
  appointmentId: string;
  appointment: Appointment;
  type: "schedule" | "create" | "cancel";
};
