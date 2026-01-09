import { redirect } from "next/navigation";
import LogoutButton from "../components/logout";
import { getSession } from "@/lib/auth";

export default async function PrivatePage() {
  const session = await getSession();

  if (!session) {
    redirect("/?auth=login");
  }

  return (
    <div>
      <h1>Private Page</h1>
      <p>Welcome {session.user.email}</p>
      <LogoutButton />
    </div>
  );
}
