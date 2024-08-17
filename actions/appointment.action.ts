"use server";
import { database } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
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
  console.log("🚀 ~ createNewAppointment ~ data:", data);
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

export const getAllAppointments = async (filter: string) => {
  try {
    // const queries = filter !== "all" ? [sdk.Query.equal("status", filter)] : [];

    const appointments = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      [sdk.Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.documents as Appointment[]).reduce(
      (acc, appointment) => {
        switch (appointment.status) {
          case "schedule":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancel":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    };
    console.log("🚀 ~ getAllAppointments ~ data:", data);

    return parseStringify(data);
  } catch (error) {
    console.log("🚀 ~ getAllAppointments ~ error:", error);
  }
};
