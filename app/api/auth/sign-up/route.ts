import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import prisma from "@/lib/prisma";
import { createSession, validatePassword } from "@/lib/auth";
export async function POST(req: Request) {
  const { email, password } = await req.json();

    // 1. check input
    if(!email || !password) {
        return NextResponse.json(
            { error: "Missing email or password" },
            { status: 400 }
        );
    }
    // check if user exists

    const user =  await prisma.localUsers.findUnique({
        where: { email },
    });

    if (user) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
        );
    }
    // email format validation
    const  isValidEmail =(email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

if (!email || !isValidEmail(email)) {
  return NextResponse.json(
    { error: "Invalid email address" },
    { status: 400 }
  );
}



const { isValid } = validatePassword(password);

if (!isValid) {
  return NextResponse.json(
    { error: "Password does not meet security requirements" },
    { status: 400 }
  );
}

    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // create user
    const newUser = await prisma.localUsers.create({
        data: {
            email,
            passwordHash,
            role: "USER",
        },
    });

    // set session cookie

    
      await createSession(newUser.id);
    
      return NextResponse.json(
        { message : "User created successfully"},
      );
/*
// INITIAL CODE BEFORE REFACTORING
    const response = NextResponse.json({ message : "User created successfully"});
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
