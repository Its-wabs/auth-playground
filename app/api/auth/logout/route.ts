import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("session")?.value;

  if (!sessionId) {
    // Already logged out (idempotent)
    return NextResponse.json({ message: "Logged out" });
  }

  // 1️⃣ Delete session from DB
  await prisma.session.deleteMany({
    where: { id: sessionId },
  });

  // 2️⃣ Clear cookie
  const response = NextResponse.json({ message: "Logged out" });

  response.cookies.set({
    name: "session",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
