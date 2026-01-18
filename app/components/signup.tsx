"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);

  // Password validation 
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strengthScore = Object.values(passwordRules).filter(Boolean).length;
  const strengthPercent = (strengthScore / 5) * 100;
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isEmailValid) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (strengthScore < 5) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Sign up failed");
      return;
    }

    // ✅ SUCCESS  
    router.push("/private");
  };

  const goToLogin = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("show-login"));
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col justify-between max-w-md mx-auto px-8 py-10 w-[86%]">
      {/* Title */}
      <div className="overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-semibold uppercase tracking-tight leading-none">
          Sign Up
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-8 mt-4">
        <div className="overflow-hidden">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="EMAIL"
            className="w-full bg-transparent border-b border-black/20 py-4 text-lg tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
          />
        </div>

        <div className="overflow-hidden">
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            className="w-full bg-transparent border-b border-black/20 py-4 text-lg tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
          />
        </div>
       

        {/* Password strength bar  */}
        <div >
          {isPasswordFocused && (
            <div className="h-1 bg-black/10 rounded">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${strengthPercent}%`,
                  backgroundColor:
                    strengthScore < 2 ? "#dc2626" : 
                    strengthScore < 4 ? "#f59e0b" : "#16a34a",
                }}
              />
            </div>
          )}
        </div>

          {/* Password requirements */} 
          {!isPasswordFocused && password && strengthScore < 5 && (
            <div className="text-xs text-red-600 mt-2 transition-all duration-300">
              Password needs: {[
                !passwordRules.length && "8+ chars",
                !passwordRules.uppercase && "uppercase",
                !passwordRules.lowercase && "lowercase",
                !passwordRules.number && "number",
                !passwordRules.special && "special char"
              ].filter(Boolean).join(', ')}
            </div>
          )}
       

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-sm rounded">
            {error}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-6 mt-8">
        <div className="overflow-hidden">
          <button
            onClick={handleSubmit}
            disabled={loading}
            type="submit"
            className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <div className="overflow-hidden">
            <p className="text-sm uppercase tracking-wider text-black/60">
              Already have an account?{" "}
              <button
                onClick={goToLogin}
                className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors bg-transparent border-none p-0"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;