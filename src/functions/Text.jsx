function Text({ activeMode, setActiveMode }) {
    return (
        <button
         onClick={() => setActiveMode("text")}
         className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
            <div className="text-3xl">📝</div>
            Text
         </button>
    );
}
export default Text