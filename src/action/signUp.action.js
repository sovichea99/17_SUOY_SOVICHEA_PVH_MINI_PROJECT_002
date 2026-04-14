"use server";

import { signUpService } from "../service/auth.service";

export async function signUpAction(formData) {
  const res = await signUpService(formData);

  console.log("Backend response:", res);

  if (res?.status === "201 CREATED" || res?.message?.includes("successfully")) {
   return {
    success: true,
    message: "Registration successful. Please log in."
   }
  }
  const errorMessage = res?.detail || res?.message || "Registration failed. Please try again.";
 return {
    success: false,
    message: errorMessage
  };
}