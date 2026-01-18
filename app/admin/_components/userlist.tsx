"use client";

import { useState } from "react";

interface User {
  id: string;
  email: string;
  role: string;
  createdAt?: Date;
}

export default function UserList({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    const res = await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    if (res.ok) {
      location.reload();
    }
  };

  const handleUpdate = async (userId: string, role: User["role"]) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    if (res.ok) {
      location.reload();
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium text-muted-foreground">User</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
            <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr 
              key={user.id} 
              className="border-b hover:bg-muted/30 transition-colors"
              onMouseEnter={() => setSelectedUser(user.id)}
              onMouseLeave={() => setSelectedUser(null)}
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium text-primary">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">ID: {user.id.substring(0, 8)}...</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  user.role === "ADMIN" 
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdate(user.id, user.role === "ADMIN" ? "USER" : "ADMIN")}
                    className="px-3 py-1.5 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {user.role === "ADMIN" ? "Make User" : "Make Admin"}
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1.5 text-sm font-medium rounded-md border border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {users.length === 0 && (
        <div className="p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground mt-1">No users have registered yet</p>
        </div>
      )}
    </div>
  );
}