function Retrieval(){
    return (
        <section className="relative mt-170 mx-auto w-125 mb-60">
            
                <div className="rounded-xl border border-white bg-white/10 px-54 py-2 text-xl font-semibold text-white backdrop-blur-md mb-4">
                Retrieve
                </div>
            

            <div className="h-52 w-full rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
            </div>

            <div className="mt-5 flex items-center gap-4">

                <input
                    type="text"
                    placeholder="Code"
                    className="h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 backdrop-blur-md"
                />

                <button
                    className="cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-6 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40"
                >
                    Retrieve
                </button>

            </div>
        </section>
    );
}

export default Retrieval;