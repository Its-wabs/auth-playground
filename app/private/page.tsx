import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import LogoutButton from "../components/logout";

export default async function PrivatePage({ params }: { params?: any }) {

  const sessionId = (await cookies()).get("session")?.value;

  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });


  return (
    <div>
      <h1>Private Page</h1>
      <p>Welcome {session.user.email}</p>
      <LogoutButton/>
    </div>
  );
}
