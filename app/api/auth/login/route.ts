import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";    
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 1️⃣ Validate input
  if (!email || !password) {
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );
  }

  // 2️⃣ Find user by email
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user || !user.passwordHash) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // 3️⃣ Compare password with hash
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  // 4️⃣ Success (for now, just return user)
  return NextResponse.json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  });
}
