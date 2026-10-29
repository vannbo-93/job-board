/** @format */

"use server";

import { redirect } from "next/navigation";
import { signup } from "@/services/auth/auth.service";

export type SignupState =
  | {
      errors?: Record<string, string[] | undefined>;
      values?: { name: string; email: string };
    }
  | undefined;

export async function handleSignup(
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const input = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  };

  // Never send passwords back to the browser
  const values = { name: input.name, email: input.email };

  let result;
  try {
    result = await signup(input);
  } catch (error) {
    console.error("handleSignup failed:", error);
    return {
      errors: { form: ["Something went wrong. Please try again."] },
      values,
    };
  }

  if (!result.success) {
    return { errors: result.errors, values };
  }

  redirect("/login?registered=1");
}
