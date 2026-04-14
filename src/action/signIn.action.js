"use server";

import { signIn } from "../app/auth";

export async function signInAction(formData) {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    return { success: true }; 
  } catch (error) {
    if (error?.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}