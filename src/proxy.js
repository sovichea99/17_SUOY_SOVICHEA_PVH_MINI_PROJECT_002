import { NextResponse } from "next/server";
import { auth } from "./app/auth";

export async function proxy(req) {
  const session = await auth();
  const isLoggedIn = req.nextUrl.pathname.startsWith("/login");
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*"],
};      