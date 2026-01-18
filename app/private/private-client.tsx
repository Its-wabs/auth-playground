"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import LogoutButton from "../components/logout";


interface User {
  email: string;
  id: string;
}

interface PrivateClientProps {
  user: User;
}

export default function PrivateClient({ user }: PrivateClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fade-in", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.to(pulseRef.current, {
        scale: 1.15,
        opacity: 0,
        repeat: -1,
        duration: 1.6,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-background flex items-center justify-center"
    >
      <section className="max-w-xl w-full px-8 py-12 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <h1 className="fade-in text-5xl font-bold uppercase tracking-tight">
            Private
          </h1>
          <p className="fade-in text-sm uppercase tracking-wider text-muted-foreground">
            Authenticated session
          </p>
        </div>

        {/* Identity block */}
        <div className="fade-in border-l-2 border-black pl-4 space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Signed in as
          </p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        {/* Secure signal */}
        <div className="fade-in flex items-center gap-4">
          <div className="relative w-3 h-3">
            <div
              ref={pulseRef}
              className="absolute inset-0 rounded-full bg-black"
            />
            <div className="relative w-3 h-3 rounded-full bg-green-600" />
          </div>
          <p className="text-xs uppercase tracking-wider">
            Session active
          </p>
        </div>

        {/* Actions */}
        <div className="fade-in pt-6">
          <LogoutButton />
        </div>
      </section>
    </main>
  );
}
