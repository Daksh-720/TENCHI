function Login (){
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-96 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
             <h2 className="mb-6 text-2xl text-center font-semibold text-white">
                Login
             </h2>

             <div className="mb-4">
                <input
                 type="email"
                 placeholder="Enter Email..."
                 className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60" 
                 />
            </div>

            <div className="mb-6">
                <input
                 type="password"
                 placeholder="Password"
                 className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
                />
            </div>

            <button className="w-full cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40">
            Login
            </button>
        </div>
      </div>
    );
}

export default Login