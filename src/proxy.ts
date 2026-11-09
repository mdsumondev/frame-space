import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  try {
    // Check Better Auth session
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    // User is not authenticated
    if (!session) {
      const signInUrl = new URL("/sign-in", request.url);

      // Keep the requested URL for redirect after login
      signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);

      return NextResponse.redirect(signInUrl);
    }

    // User is authenticated
    return NextResponse.next();
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-booking/:path*",
    "/my-bookings/:path*",
    "/studios/edit/:path*",
  ],
};
