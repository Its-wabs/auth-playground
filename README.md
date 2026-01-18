
# Auth Playground

An interactive authentication playground designed to explore **real-world auth flows and session logic** using modern full-stack patterns.

This project focuses on **how authentication systems behave**, not just how they’re implemented.

---

## Overview

Authentication is one of the most misunderstood parts of modern web applications.

This playground exists to:
- experiment with real-world auth scenarios
- visualize permission boundaries
- explore trade-offs between UX, security, and system complexity

Rather than being a production-ready auth service, this project acts as a **controlled environment for reasoning about auth systems**.

---

## Key Features

- Multiple authentication flows (email, OAuth, session-based)
- Role-based and permission-based access control
- Protected routes and gated UI states
- Session lifecycle handling (login, refresh, logout)
- UX feedback for auth states (loading, errors, denied access)

---

## Architecture & Concepts

This project intentionally separates **auth concepts** from UI concerns.

Key ideas explored:
- **Authentication vs Authorization** separation
- **Session-driven UI state**
- **Role-based vs permission-based access**
- **Server-side vs client-side checks**
- **Auth as a state machine**

---

## Tech Stack

- **Framework:** Next.js
- **Auth:** NextAuth 
- **Database:** Supabase / PostgreSQL
- **ORM:** Prisma
- **Styling:** Tailwind CSS
- **State:** Server-driven auth state

---

## Screenshots

Will add later if it's needed.

---

## Local Setup

```bash
git clone https://github.com/your-username/auth-playground.git
cd auth-playground
npm install
npm run dev
