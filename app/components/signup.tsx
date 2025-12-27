
const SignUp = () => {
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
                        type="email" 
                        placeholder="EMAIL" 
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg uppercase tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                    />
                </div>
                
                <div className="overflow-hidden">
                    <input 
                        type="password" 
                        placeholder="PASSWORD" 
                        className="w-full bg-transparent border-b border-black/20 py-4 text-lg uppercase tracking-wide placeholder:text-black/40 placeholder:font-medium outline-none focus:border-black transition-colors duration-300"
                    />
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col gap-6 mt-8">
                <div className="overflow-hidden">
                    <button className="w-full bg-black text-white py-4 uppercase tracking-wider font-medium text-lg hover:bg-black/80 transition-colors duration-300 cursor-pointer">
                        Login
                    </button>
                </div>
                
                <div className="flex flex-col gap-4 text-center">
                    <div className="overflow-hidden">
                        <p className="text-sm uppercase tracking-wider text-black/60">
                            Already have an account? <a onClick={() => window.dispatchEvent(new Event("show-login"))} className="font-semibold cursor-pointer text-black underline underline-offset-4 hover:text-black/60 transition-colors">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SignUp;