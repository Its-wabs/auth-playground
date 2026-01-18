// app/api/reset/send/route.ts
import { sendResetEmail } from "@/lib/email";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Missing email" },
      { status: 400 }
    );
  }

  const user = await prisma.localUsers.findUnique({
    where: { email },
  });

  // Always return success (anti-enumeration)
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = crypto.randomUUID();

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  // 🔥 Email is best-effort
  try {
    await sendResetEmail(email, token);
  } catch (err) {
    console.error("Email failed, token still valid:", err);
  }

  return NextResponse.json({ ok: true });
}
