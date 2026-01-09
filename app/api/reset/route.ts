import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email} = await req.json();

    // validate input
    if(!email) {
        return NextResponse.json(
             { error: "Missing email or password" },
      { status: 400 }
        )
    }

    // find user by email 

const user = await prisma.localUsers.findUnique({
    where: { email },
  });

     // return success (avoid email enumeration)
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // create reset token

  const token = crypto.randomUUID();

  await prisma.passwordResetToken.create({
    data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 min
    },
  });

  // dev only
/*
  console.log(
    `Reset link: http://localhost:3000/reset?token=${token}`
  );

  return NextResponse.json({ ok: true });

*/
return NextResponse.json({ ok: true, token });
}


  