"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPage = () => {

 const searchParams = useSearchParams();
const token = searchParams.get("resetToken");
const router = useRouter();





  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  
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

  
    if (strengthScore < 5) {
      setError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
      setLoading(false);
      return;
    }

  const res = await fetch("/api/reset/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      password,
    }),
  });

  const data = await res.json();
  setLoading(false);

  if (!res.ok) {
    setError(data.error || "Reset failed");
    return;
  }

  //  Success
  setDone(true);
  router.replace("/?auth=login");

};


useEffect(() => {
  if (searchParams.get("auth") === "login") {
    window.dispatchEvent(new Event("show-login")); 
  }
}, [searchParams]);



if (done) return null;


 

    return ( 
        <div className="flex flex-col justify-between max-w-md mx-auto px-8 py-10">
            {/* Title */}
            <div className="overflow-hidden">
                <h1 className="text-3xl md:text-3xl font-semibold uppercase tracking-tight leading-none">
                    Set New Password
                </h1>
              
            </div>
            
            {/* Form */}
            <div className="flex flex-col gap-8 mt-4">
                 <div className="overflow-hidden">
                    <input 
                        type="password" 
                        placeholder="NEW PASSWORD" 
                        value={password}
                         
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg  tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                        required
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
       
                
                <div className="overflow-hidden">
                    <input 
                        type="password" 
                        placeholder="CONFIRM PASSWORD" 
                        value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg  tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                        required
                    />
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="overflow-hidden">
                    {password !== confirmPassword || strengthScore < 5  ? (
 <button
                     type="submit"
                        onClick={handleSubmit}
          disabled
                     className="w-full bg-black/45 text-black py-4 uppercase tracking-wider font-medium text-lg"
                  
                     >

                       Passwords dont match
                    </button>

                    ): (
                        <button
                     type="submit"
                        onClick={handleSubmit}
          disabled={loading}
                     className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer">
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>

                    )}
                    
                     {error && (
          <p className="text-sm text-red-600 text-center uppercase">
            {error}
          </p>
        )}
                </div>
                
               
            </div>
        </div>
    );
}
 
export default ResetPage;