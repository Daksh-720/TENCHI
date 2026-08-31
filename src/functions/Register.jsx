function Register() {
    return (
        <div className="flex min-h-screen items-center justify-center">

            <div className="w-96 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
             <h2 className="mb-6 text-center text-2xl font-semibold text-white">
              Register
             </h2>

             <div className="mb-4">
                <input
                 type="text"
                 placeholder="Username"
                 className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
                />
             </div>

             <div className="mb-4">
                <input
                 type="email"
                 placeholder="Email"
                 className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
                />
             </div>

             <div className="mb-4">
                 <input
                  type="password"
                  placeholder="Password"
                  className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
                 />
             </div>

             <div className="mb-6">
                    <input
                     type="password"
                     placeholder="Confirm Password"
                     className="h-12 w-full rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 focus:border-[#00D2FF]/60"
                    />
             </div>

             <button className="w-full cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40">
               Register
             </button>
            </div>
        </div>
    );
}

export default Register