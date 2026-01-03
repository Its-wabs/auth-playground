"use client";

interface User {
  id: string;
  email: string;
  role: string;
}

export default function UserList({ users }: { users: User[] }) {
  const handleDelete = async (userId: string) => {
    const res = await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      location.reload(); // simple for now
    }
  };

  const handleUpdate = async (userId: string, role: User["role"]) => {
  const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    if (res.ok) {
      location.reload(); // simple for now
    }
  }

  return (
    <ul className="m-5 p-6">
      {users.map((user) => (
        <li key={user.id} className="border-b py-4 flex gap-4">
          <p>{user.email}</p>
          <p>{user.role}</p>

          <button
            onClick={() => handleDelete(user.id)}
            className="bg-black text-white px-4 py-2"
          >
            Delete
          </button>
         <button
            onClick={() =>
              handleUpdate(
                user.id,
                user.role === "ADMIN" ? "USER" : "ADMIN"
              )
            }
            className="bg-black text-white px-4 py-2"
          >
            Toggle Role
          </button>
        </li>
      ))}
    </ul>
  );
}
