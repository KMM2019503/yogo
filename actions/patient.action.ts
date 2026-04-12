"use server";

import * as sdk from "node-appwrite";
import { database, storage, users } from "@/lib/appwrite.config";
import { serverEnv } from "@/lib/server-env";
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
      const existingUsersByEmail = await users.list([
        sdk.Query.equal("email", [user.email]),
      ]);

      const existingUserByEmail = existingUsersByEmail.users[0];
      if (existingUserByEmail) {
        return parseStringify(existingUserByEmail);
      }

      const existingUsersByPhone = await users.list([
        sdk.Query.equal("phone", [user.phone]),
      ]);

      return parseStringify(existingUsersByPhone.users[0] ?? null);
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
  }
};

export const getUserByPhone = async (phone: string) => {
  try {
    const userList = await users.list([sdk.Query.equal("phone", [phone])]);
    return parseStringify(userList.users[0] ?? null);
  } catch (error) {
    console.log("🚀 ~ getUserByPhone ~ error:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await database.listDocuments(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_PATIENT_COLLECTION_ID,
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
        serverEnv.APPWRITE_BUCKET_ID,
        sdk.ID.unique(),
        inputFile
      );
    }

    // patient createion
    const newPatient = await database.createDocument(
      serverEnv.APPWRITE_DATABASE_ID,
      serverEnv.APPWRITE_PATIENT_COLLECTION_ID,
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
        identificationDocumentUrl: `${serverEnv.APPWRITE_ENDPOINT}/storage/buckets/${serverEnv.APPWRITE_BUCKET_ID}/files/${file?.$id}/view?project=${serverEnv.APPWRITE_PROJECT_ID}`,
        treatmentConsent: patient.treatmentConsent,
        disclosureConsent: patient.disclosureConsent,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
