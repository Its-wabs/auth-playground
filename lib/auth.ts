import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export const SESSION_COOKIE = "session";

const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: string) {
  const session = await prisma.localSessions.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION),
    },
  });

  (await cookies()).set(SESSION_COOKIE, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION / 1000,
  });

  return session;
}

export async function getSession() {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await prisma.localSessions.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) {
    return null;
  }

  return session;
}

export async function requireSession() {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await prisma.localSessions.findUnique({
    where: { id: sessionId },
    include: { user: true },
  });

  if (!session || session.expiresAt < new Date()) return null;

  return session;
}


export async function requireAdmin() {
  const session = await requireSession();

  if (session.user.role !== "ADMIN") {
    throw new Error("FORBIDDEN");
  }

  return session;
}

export async function destroySession() {
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  if (sessionId) {
    await prisma.localSessions.delete({ where: { id: sessionId } });
  }

  (await cookies()).delete(SESSION_COOKIE);
}

export function validatePassword(password: string) {
  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isValid = Object.values(rules).every(Boolean);

  return { isValid, rules };
}