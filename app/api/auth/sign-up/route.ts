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
        },
    });

    return NextResponse.json({ 
        message: "User created successfully",
     user : {
            id: newUser.id,
            email: newUser.email,
        },
     },
         { status: 201 });   
          

}
