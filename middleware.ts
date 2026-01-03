// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import prisma from "./lib/prisma";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip public routes
  if (url.pathname.startsWith("/api") || url.pathname === "/") {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionId = req.cookies.get("session")?.value;

  if (!sessionId) {
    // Not logged in → redirect to login
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Check session in DB
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    // Invalid or expired session
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Optional: protect admin routes
  if (url.pathname.startsWith("/admin") && session.user.role !== "ADMIN") {
    url.pathname = "/"; // or 403 page
    return NextResponse.redirect(url);
  }

  // ✅ All good, allow the request
  return NextResponse.next();
}

// Only run middleware on these paths
export const config = {
  matcher: ["/private/:path*", "/admin/:path*"],
  runtime: "nodejs",
};
