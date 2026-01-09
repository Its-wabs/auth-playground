"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
 
       const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const goToLogin = () => {
    if (pathname === "/") {
      window.dispatchEvent(new Event("show-login"));
    } else {
      router.push("/login");
    }
  };
  const handleSubmit = async () => {

    if (!email) return;

  setLoading(true);

  const res = await fetch("/api/reset/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

if (!res.ok) {
  throw new Error("Failed to send reset email");
}

setSent(true);



  }
  // dev only 
/* 
 const handleSubmit = async () => {
  if (!email) return;

  setLoading(true);

  const res = await fetch("/api/reset", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  setLoading(false);

  //  (avoid enumeration)
  if (data?.token) {
    // 1️⃣ Put token in URL
    window.history.pushState(
      {},
      "",
      `/?resetToken=${data.token}`
    );

    // 2️⃣ Show reset-new card
    window.dispatchEvent(new Event("show-resetnew"));
  }

  setSent(true);
};

*/

    return ( 
        <div className="flex flex-col justify-between max-w-md mx-auto px-8 py-10">
            {/* Title */}
            <div className="overflow-hidden">
                <h1 className="text-5xl md:text-6xl font-semibold uppercase tracking-tight leading-none">
                    reset Password
                </h1>
                
            </div>
          

            {sent && (
  <p className="text-sm text-center">
    If the email exists, you’ll receive a reset link.
  </p>
)}
            
            {/* Form */}
            <div className="flex flex-col gap-8 mt-4">
                <div className="overflow-hidden">
               
                    <input 
                        type="email" 
                        placeholder="EMAIL" 
                         value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                        required
                    />
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
               
                
                <div className="flex flex-col gap-4 text-center">
                    <div className="overflow-hidden">
                    <button
  onClick={handleSubmit}
  disabled={loading}
  className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer"
>
  {loading ? "Sending..." : "Send Reset Link"}
</button>
                </div>
                    <div className="overflow-hidden">
                        <p className="text-sm uppercase tracking-wider text-black/60">
                            memory back? <a onClick={goToLogin} className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors">Login</a>
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
export default ResetPassword;