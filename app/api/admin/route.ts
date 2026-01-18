import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request) {
  const { userId } = await req.json();
    // Check if user exists 
    const user =  await prisma.localUsers.findUnique({
        where: { id: userId },
    });
    if (!user) {
        return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
        );
    }
    // Delete user      
    await prisma.localUsers.delete({
        where: { id: userId },
    }); 
    return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
    );   
}


export async function PATCH(req: Request) {
  const { userId, role } = await req.json();

  // 1️⃣ Validate input
  if (!userId || !role) {
    return NextResponse.json(
      { error: "Missing userId or role" },
      { status: 400 }
    );
  }

  // 2️⃣ Validate role
  if (!["USER", "ADMIN"].includes(role)) {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  // 3️⃣ Check user exists
  const user = await prisma.localUsers.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    );
  }

  // 4️⃣ Update role
  const updatedUser = await prisma.localUsers.update({
    where: { id: userId },
    data: { role },
  });

  return NextResponse.json({
    message: "Role updated",
    user: {
      id: updatedUser.id,
      role: updatedUser.role,
    },
  });
}