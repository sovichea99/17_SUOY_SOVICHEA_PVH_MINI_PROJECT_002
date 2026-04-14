"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { sileo } from "sileo";

export default function LoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const loginParam = searchParams.get("login");

    if (loginParam === "success" && session) {
      sileo.success({
        title: "Welcome Back!",
        description: "Login successful. Your items are ready.",
        fill: "#171717",
        position: "top-center",
        styles: {
          title: "text-white!",
          description: "text-white/75!",
        },
      });
      router.replace("/", { scroll: false });
    }
  }, [searchParams, session, router]);

  return null;
}