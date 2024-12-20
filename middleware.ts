import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = token ? true : false;

  const pathSegments = request.nextUrl.pathname.split("/");

  if (!isAuthenticated && pathSegments[1] === "u") {
    const loginPath = "/auth";
    const loginURL = new URL(loginPath, request.nextUrl.origin);
    return NextResponse.redirect(loginURL);
  }

  if (isAuthenticated && pathSegments[1] === "auth") {
    const newURL = new URL("/u", request.nextUrl.origin);
    return NextResponse.redirect(newURL);
  }

  return NextResponse.next();
}
