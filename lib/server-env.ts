import "server-only";

const readEnv = (key: string, fallbackKey?: string) => {
  const value = process.env[key] ?? (fallbackKey ? process.env[fallbackKey] : undefined);

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}${
        fallbackKey ? ` (or fallback ${fallbackKey})` : ""
      }`
    );
  }

  return value;
};

export const serverEnv = {
  APPWRITE_ENDPOINT: readEnv("APPWRITE_ENDPOINT", "NEXT_PUBLIC_ENDPOINT"),
  APPWRITE_PROJECT_ID: readEnv("APPWRITE_PROJECT_ID", "NEXT_PUBLIC_PROJECT_ID"),
  APPWRITE_API_SECRET_KEY: readEnv(
    "APPWRITE_API_SECRET_KEY",
    "NEXT_PUBLIC_API_SECRET_KEY"
  ),
  APPWRITE_DATABASE_ID: readEnv("APPWRITE_DATABASE_ID", "NEXT_PUBLIC_DATABASE_KEY"),
  APPWRITE_PATIENT_COLLECTION_ID: readEnv(
    "APPWRITE_PATIENT_COLLECTION_ID",
    "NEXT_PUBLIC_PATIENT_Collection_ID"
  ),
  APPWRITE_DOCTOR_COLLECTION_ID: readEnv(
    "APPWRITE_DOCTOR_COLLECTION_ID",
    "NEXT_PUBLIC_DOCTOR_Collection_ID"
  ),
  APPWRITE_APPOINTMENT_COLLECTION_ID: readEnv(
    "APPWRITE_APPOINTMENT_COLLECTION_ID",
    "NEXT_PUBLIC_APPOINTMENT_Collection_ID"
  ),
  APPWRITE_BUCKET_ID: readEnv("APPWRITE_BUCKET_ID", "NEXT_PUBLIC_BUCKET_ID"),
  ADMIN_PASS_CODE: readEnv("ADMIN_PASS_CODE", "NEXT_PUBLIC_ADMIN_PASS_CODE"),
};
