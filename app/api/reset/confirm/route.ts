import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  // 1️⃣ Validate input
  if (!token || !password) {
    return NextResponse.json(
      { error: "Missing token or password" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password too short" },
      { status: 400 }
    );
  }

  // 2️⃣ Find token in DB
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true },
  });

  // 3️⃣ Invalid or expired token
  if (!resetToken || resetToken.expiresAt < new Date()) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  // 4️⃣ Hash new password
  const passwordHash = await bcrypt.hash(password, 10);

  // 5️⃣ Update user password
  await prisma.localUsers.update({
    where: { id: resetToken.userId },
    data: { passwordHash },
  });

  // 6️⃣ Delete token 
  await prisma.passwordResetToken.delete({
    where: { token },
  });

  return NextResponse.json({ ok: true });
}
