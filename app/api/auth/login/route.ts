import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";    
import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

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
  const user = await prisma.localUsers.findUnique({
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
  // 4️⃣ Create session  

  await createSession(user.id);

  return NextResponse.json(
    { message: "Login successful"},
  );
  
  /*
  // INITIAL CODE BEFORE REFACTORING
  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
  });


  // 5️ Set session cookie
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set({  
    name: "session",
    value: session.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
  */
}
