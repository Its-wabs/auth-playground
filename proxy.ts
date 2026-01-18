import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect these routes
  if (!pathname.startsWith("/private") && !pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const sessionId = req.cookies.get("session")?.value;

  if (!sessionId) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/private/:path*", "/admin/:path*"],
};
