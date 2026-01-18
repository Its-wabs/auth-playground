"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/"); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 m-2 bg-black text-white py-2 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer"
    >
      Logout
    </button>
  );
}
