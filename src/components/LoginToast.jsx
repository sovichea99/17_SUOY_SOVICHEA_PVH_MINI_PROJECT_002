"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { sileo } from "sileo";

export default function LoginToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const loginStatus = searchParams.get("login");

  useEffect(() => {
    console.log("Check URL status:", loginStatus); // Should print "success" in browser console

    if (loginStatus === "success") {
      console.log("Firing Sileo Toast now!");
      
      sileo.success({
        title: "Welcome back!",
        description: "You have logged in successfully.",
      });

      // Clear the URL
      const params = new URLSearchParams(searchParams.toString());
      params.delete("login");
      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  }, [loginStatus, searchParams, router]);

  return null;
}