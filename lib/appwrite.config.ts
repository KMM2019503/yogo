import * as sdk from "node-appwrite";

// export const {
//   API_SECRET_KEY,
//   PROJECT_ID,
//   DATABASE_KEY,
//   PATIENT_Collection_ID,
//   DOCTOR_Collection_ID,
//   APPOINTMENT_Collection_ID,
//   NEXT_PUBLIC_BUCKET_ID,
//   NEXT_PUBLIC_ENDPOINT: ENDPINIT,
// } = process.env;

const client = new sdk.Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_SECRET_KEY!);

// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("66b1e51b002d321e1e7c")
//   .setKey(
//     "3f2e9a46da2ee10622fa2ab9ee7025e47648372d66d3dbc1ea8f36c51a84b1397c9d7762a8c6cd6da01a08c7d3581019305ad80743b82aad1ffa58d56085685ff5c763c4f66b95ee7602cf866a664abefcf13c81aea94611e699b5994ed5239be8ecae3f341ad2ea80f69650a62078e94c3c91bac0740bbe89b7edb656ec68a4"
//   );

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
