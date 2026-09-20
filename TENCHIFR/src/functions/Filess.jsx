function Filess({ activeMode, setActiveMode, files, setFiles, darkMode }) {
    function handleFileChange(event){
        setFiles(Array.from(event.target.files));
        setActiveMode("files");
    }

    const isActive = activeMode === "files";

    return (
        <>
            <input type="file" id="fileInput" multiple onChange={handleFileChange} className="hidden" />
            <button
                type="button"
                onClick={() => {
                    setActiveMode("files");
                    document.getElementById("fileInput").click();
                }}
                className={`flex h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-27 lg:w-27 flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3 rounded-xl sm:rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                    darkMode
                        ? isActive
                            ? "border-cyan-400/90 bg-white/25 text-white shadow-[0_0_16px_rgba(0,210,255,0.35)]"
                            : "border-white/20 bg-white/10 text-white hover:bg-white/20"
                        : isActive
                            ? "border-cyan-600/90 bg-white/70 text-black shadow-md"
                            : "border-black/25 bg-white/30 text-black shadow-lg hover:bg-white/50"
                }`}
            >
                <div className="text-xl sm:text-2xl md:text-3xl">📄</div>
                <span className="text-[11px] sm:text-xs md:text-sm font-medium">Files</span>
            </button>
        </>
    );
}
export default Filess;
