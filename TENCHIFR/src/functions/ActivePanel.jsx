import SendRet from "./SendRet";

function ActivePanel({ activeMode, files, text, setText, darkMode }) {
    if (!activeMode) return null;

    const fileModes = ["files", "folder", "image", "video"];

    return (
        <div className="mt-5 sm:mt-6 w-full max-w-[92vw] sm:max-w-125 mx-auto flex flex-col items-center">
            {activeMode === "text" && (
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter Text..."
                    className={
                        darkMode
                            ? "h-44 sm:h-52 w-full resize-none rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 text-sm sm:text-base text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40 shadow-lg"
                            : "h-44 sm:h-52 w-full resize-none rounded-2xl border-2 border-black/20 bg-white/50 p-4 sm:p-5 text-sm sm:text-base text-black outline-none backdrop-blur-md placeholder:text-black/40 shadow-md focus:border-black/30"
                    }
                />
            )}

            {fileModes.includes(activeMode) && (
                <div className={
                    darkMode
                        ? "h-44 sm:h-52 w-full overflow-y-auto rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 text-sm sm:text-base text-white backdrop-blur-md shadow-lg"
                        : "h-44 sm:h-52 w-full overflow-y-auto rounded-2xl border border-black/20 bg-white/75 p-4 sm:p-5 text-sm sm:text-base text-black shadow-lg backdrop-blur-md"
                }>
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <div
                                key={index}
                                className={
                                    darkMode
                                        ? "mb-2 rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-white"
                                        : "mb-2 rounded-lg border border-black/10 bg-black/5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-black"
                                }
                            >
                                {activeMode === "folder" ? (file.webkitRelativePath || file.name) : file.name}
                            </div>
                        ))
                    ) : (
                        <div className={darkMode ? "text-white/50 text-xs sm:text-sm" : "text-black/50 text-xs sm:text-sm"}>No files selected</div>
                    )}
                </div>
            )}

            <div className="mt-4 sm:mt-5 w-full flex justify-center">
                <SendRet
                    activeMode={activeMode}
                    text={text}
                    files={files}
                    darkMode={darkMode}
                />
            </div>
        </div>
    );
}

export default ActivePanel;