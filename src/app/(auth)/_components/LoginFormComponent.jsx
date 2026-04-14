"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInAction } from "../../../action/signIn.action";
import { useSearchParams } from "next/navigation";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
})
export default function LoginFormComponent() {
  const [submitError, setSubmitError] = useState("");
  const success = useSearchParams().get("success");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setSubmitError("");
    const result = await signInAction(data);
    if (result.success) {
      router.push("/?login=success");
    }
    const res = await signInAction(data);

    if (res?.error) {
      setSubmitError(res.error);
      return;
    }
  };
  useEffect(() => {
    if (success === "true") {
      router.replace("/login");
      sileo.success("Account created successfully!", {
        description: "Please log in with your email and password.",
        duration: 6000,
      });
    }
  }, [success]);

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {submitError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {submitError}
        </div>
      )}

      <div>
        <label
          htmlFor="login-email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
          placeholder="you@example.com"
        />
      </div>
      {errors.email && (
        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
      )}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none ring-lime-400/20 focus:border-lime-400 focus:ring-2"
          placeholder="••••••••"
        />
      </div>
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
      )}
      <Button
        type="submit"
        variant="solid"
        className="w-full rounded-full bg-lime-400 py-3.5 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-lime-300"
      >
        Sign in
      </Button>
      <button
        type="button"
        onClick={() => {
          sileo.success({
            title: "Registered successfully!",
            description: (
              <span className="text-white font-medium! text-center">
                Please log in with your email and password.
              </span>
            ),
          });
        }}
      >
        Test Toast
      </button>
    </form>
  );
}