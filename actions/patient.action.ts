import * as sdk from "node-appwrite";
import { users } from "@/lib/appwrite.config";
import { parseStringify } from "@/lib/utils";

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
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log("🚀 ~ getUser ~ error:", error);
  }
};
