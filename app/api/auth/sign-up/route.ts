import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import prisma from "@/lib/prisma";
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

    const user =  await prisma.users.findUnique({
        where: { email },
    });

    if (user) {
        return NextResponse.json(
            { error: "User already exists" },
            { status: 409 }
        );
    }
    // hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // create user
    const newUser = await prisma.users.create({
        data: {
            email,
            passwordHash,
            role: "USER",
        },
    });

    // create session
    const session = await prisma.session.create({
        data : {
            userId: newUser.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days

        },
    });

    // set session cookie

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
          

}
