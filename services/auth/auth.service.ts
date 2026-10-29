import bcrypt from "bcryptjs";
import { z } from "zod";
import type { ServiceResult, User } from "@/types";
import { findUserByEmail, saveNewUser } from "@/repositories/users.repository";
import { signupSchema } from "./auth.validation";

const EMAIL_TAKEN = { email: ["This email is already registered"] };

export async function signup(input: unknown): Promise<ServiceResult<User>> {
  const validated = signupSchema.safeParse(input);
  if (!validated.success) {
    return { success: false, errors: z.flattenError(validated.error).fieldErrors };
  }

  // Pick only what we need; confirmPassword and anything extra are dropped here
  const { name, email, password } = validated.data;

  if (await findUserByEmail(email)) {
    return { success: false, errors: EMAIL_TAKEN };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await saveNewUser({
      name,
      email,
      passwordHash,
      role: "CANDIDATE", // set here, never taken from the form
    });
    return { success: true, data: user };
  } catch (error) {
    // E11000 = duplicate key: two sign-ups with the same email at the same moment
    if (typeof error === "object" && error && "code" in error && error.code === 11000) {
      return { success: false, errors: EMAIL_TAKEN };
    }
    throw error;
  }
}
