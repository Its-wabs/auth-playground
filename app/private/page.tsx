
import LogoutButton from "../components/logout";
import { getSession } from "@/lib/auth";

export default async function PrivatePage({ params }: { params?: any }) {


  const session = await getSession();

  return (
    <div>
      <h1>Private Page</h1>
      <p>Welcome {session.user.email}</p>
      <LogoutButton/>
    </div>
  );
}
