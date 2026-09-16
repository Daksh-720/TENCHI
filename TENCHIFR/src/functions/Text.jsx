function Text({ activeMode, setActiveMode, darkMode }) {
    return (
        <button
         onClick={() => setActiveMode("text")}
         className={
                darkMode
                    ? "flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
                    : "flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-black/25 bg-white/30 text-black backdrop-blur-md shadow-lg transition hover:bg-white/40 cursor-pointer"
            }>
            <div className="text-3xl">📝</div>
            Text
         </button>
    );
}
export default Text