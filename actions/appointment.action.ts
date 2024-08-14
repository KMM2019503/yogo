"use server";
import { database } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import * as sdk from "node-appwrite";

export const createNewAppointment = async (data: CreateAppointmentParams) => {
  try {
    // appointment createion
    const newAppointment = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_APPOINTMENT_Collection_ID!,
      sdk.ID.unique(),
      data
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
