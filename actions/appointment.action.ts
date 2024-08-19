"use server";

import { database, messaging } from "@/lib/appwrite.config";
import { formatDateTime, parseStringify } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";
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

export const handleUpdateAppointment = async (
  updateAppointment: UpdateAppointmentParams
) => {
  const { appointment } = updateAppointment;

  try {
    // update appointment
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      updateAppointment.appointmentId,
      {
        userId: appointment.userId,
        patient: appointment.patient.$id,
        schedule: appointment.schedule,
        reason: appointment.reason,
        note: appointment.note,
        status: appointment.status,
        doctor: appointment.doctor,
        cancellationReason: appointment.cancellationReason,
      }
    );

    if (!response) {
      throw Error;
    }

    const sms = `Greetings from CarePulse. ${
      updateAppointment.type === "schedule"
        ? `Your appointment is confirmed for ${
            formatDateTime(appointment.schedule!).dateTime
          } with Dr. ${appointment.doctor}`
        : `We regret to inform that your appointment for ${
            formatDateTime(appointment.schedule!).dateTime
          } is cancelled. Reason:  ${appointment.cancellationReason}`
    }.`;
    await handleSentSMS(updateAppointment.userId, sms);

    revalidatePath("/admin");
    return parseStringify(response);
  } catch (error) {
    console.log("🚀 ~ Error in updateAppointment ->:", error);
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

    return parseStringify(data);
  } catch (error) {
    console.log("🚀 ~ getAllAppointments ~ error:", error);
  }
};

export const getAppointmentsByUserId = async (userId: string) => {
  try {
    const appointments = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      [sdk.Query.orderDesc("$createdAt"), sdk.Query.equal("userId", userId)]
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

    console.log("🚀 ~ getAppointmentsByUserId ~ data:", parseStringify(data));
    return parseStringify(data);
  } catch (error) {
    console.log("🚀 ~ getAppointmentsByUserId ~ error:", error);
  }
};

export const handleSentSMS = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSms(
      sdk.ID.unique(),
      content,
      [],
      [userId]
    );
    return parseStringify(message);
  } catch (error) {
    console.log("🚀 ~ handleSentSMS ~ error:", error);
  }
};
