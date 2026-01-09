import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import PrivateClient from "./private-client";

export default async function PrivatePage() {
  const session = await getSession();

  if (!session) {
    redirect("/?auth=login");
  }

  return <PrivateClient user={session.user} />;
}
