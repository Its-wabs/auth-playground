"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {

      const pathname = usePathname();
  const router = useRouter();

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Login failed");
      return;
    }

    // ✅ SUCCESS
    if (email === "admin") {
      router.push("/admin");
      return;
    }
    router.push("/private");
  };

  const goToSignup = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("show-signup"));
    } else {
      router.push("/signup");
    }
  };

  const goToReset = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("show-reset"));
    } else {
      router.push("/reset-password");
    }
  };
    return ( 
        <div className="flex flex-col justify-between max-w-md mx-auto px-8 py-10">
            {/* Title */}
            <div className="overflow-hidden">
                <h1 className="text-5xl md:text-6xl font-semibold uppercase tracking-tight leading-none">
                    Login
                </h1>
              
            </div>
            
            {/* Form */}
            <div className="flex flex-col gap-8 mt-4">
                <div className="overflow-hidden">
                    <input 
                        type="email" 
                        placeholder="EMAIL" 
                        value={email}
            onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg  tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                        required
                    />
                </div>
                
                <div className="overflow-hidden">
                    <input 
                        type="password" 
                        placeholder="PASSWORD" 
                        value={password}
            onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg  tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                        required
                    />
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="overflow-hidden">
                    <button
                     type="submit"
                        onClick={handleSubmit}
          disabled={loading}
                     className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                     {error && (
          <p className="text-sm text-red-600 text-center uppercase">
            {error}
          </p>
        )}
                </div>

                
                
                <div className="flex flex-col gap-4 text-center">
                    <div className="overflow-hidden">
                        <p className="text-sm uppercase tracking-wider text-black/60">
                            New here? <a onClick={goToSignup} className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors">Signup</a>
                        </p>
                    </div>
                    
                    <div className="overflow-hidden">
                        <p className="text-sm uppercase tracking-wider text-black/60">
                            Forgot your password? <a onClick={goToReset} className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors">Reset password</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Login;