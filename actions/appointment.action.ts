"use server";
import { database } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import * as sdk from "node-appwrite";

export const getAppointment = async (id: string) => {
  try {
    const appointment = await database.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      id
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log("🚀 ~ Error in getAppointment:", error);
  }
};

export const createNewAppointment = async (data: CreateAppointmentParams) => {
  try {
    // appointment createion
    const newAppointment = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      sdk.ID.unique(),
      {
        userId: data.userId,
        patient: data.patient,
        schedule: data.schedule,
        reason: data.reason,
        note: data.note,
        status: data.status,
        doctor: data.doctor,
      }
    );

    console.log("🚀 ~ createNewAppointment ~ newAppointment:", newAppointment);
    return parseStringify(newAppointment);
  } catch (error) {
    console.log("🚀 ~ Error in createAppointment:", error);
  }
};
