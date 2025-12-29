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
    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

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
    router.push(`/private/${data.user.id}`);
};

  const goToLogin = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("show-login"));
    } else {
      router.push("/login");
    }
  };

    return ( 
        <div className="flex flex-col justify-between h-[70%] w-[75%] px-8 py-10">
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
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg uppercase tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                    />
                </div>
                
                <div className="overflow-hidden">
                    <input 
                        type="password" 
                        placeholder="PASSWORD" 
                         value={password}
            onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg uppercase tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                    />
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="overflow-hidden">
                    <button 
                        onClick={handleSubmit}
                            disabled={loading}
                            type="submit"
                     className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer">
                        {loading ? "signing up..." : "Sign Up"}
                    </button>
                </div>
                
                <div className="flex flex-col gap-4 text-center">
                    <div className="overflow-hidden">
                        <p className="text-sm uppercase tracking-wider text-black/60">
                            Already have an account? <a onClick={goToLogin} className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;