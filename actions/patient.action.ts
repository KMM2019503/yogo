"use server";

import * as sdk from "node-appwrite";
import { database, storage, users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      sdk.ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    console.log("🚀 ~ createUser ~ error:", error);
    if (error && error?.code === 409) {
      const documents = await users.list([
        sdk.Query.equal("email", [user.email]),
      ]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    console.log("userId: ", userId);
    const user = await users.get(userId);
    console.log(parseStringify(user));
    return parseStringify(user);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_PATIENT_Collection_ID!,
      [sdk.Query.equal("userId", userId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log("🚀 ~ getPatient ~ error:", error);
  }
};

export const registerPatient = async ({
  indentificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // file upload
    let file;
    if (indentificationDocument) {
      const inputFile =
        indentificationDocument &&
        InputFile.fromBuffer(
          indentificationDocument?.get("blobFile") as Blob,
          indentificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(
        process.env.NEXT_PUBLIC_BUCKET_ID!,
        sdk.ID.unique(),
        inputFile
      );
    }

    // patient createion
    const newPatient = await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_KEY!,
      process.env.NEXT_PUBLIC_PATIENT_Collection_ID!,
      sdk.ID.unique(),
      {
        userId: patient.userId,
        name: patient.name,
        email: patient.email,
        phone: patient.phone,
        privacyConsent: patient.privacyConsent,
        gender: patient.gender,
        dob: patient.dob,
        address: patient.address,
        occupation: patient.occupation,
        emergencyContactName: patient.emergencyContactName,
        emergencyContactNumber: patient.emergencyContactNumber,
        insuranceProvider: patient.insuranceProvider,
        insurancePolicyNumber: patient.insurancePolicyNumber,
        allergies: patient.allergies,
        currentMedication: patient.currentMedication,
        indentificationType: patient.indentificationType,
        indentificationNumber: patient.indentificationNumber,
        indentificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        treatmentConsent: patient.treatmentConsent,
        disclosureConsent: patient.disclosureConsent,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
