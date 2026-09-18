import { useState } from "react";
import SendRet from "./SendRet";
import SetExpiry from "./SetExpiry";


function ActivePanel({ activeMode, files, text, setText, darkMode }) {
    if (!activeMode) return null;

    const fileModes = ["files", "folder", "image", "video"];

    return (
        <>
            {activeMode === "text" && (
                <textarea
                 value={text}
                 onChange={(e)=> setText(e.target.value)}
                 placeholder="Enter Text..."
                 className={
                    darkMode
                        ? "absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 resize-none rounded-2xl border border-white/20 bg-white/10 p-5 text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
                        : "absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 resize-none rounded-2xl border-2 border-black/20 bg-white/50 p-5 text-black outline-none backdrop-blur-md placeholder:text-black/40 shadow-md focus:border-black/30"
                }
                />
            )}

            {fileModes.includes(activeMode) && (
                <div className={
                    darkMode
                        ? "absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 overflow-y-auto rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md"
                        : "absolute left-1/2 top-34 h-52 w-125 -translate-x-1/2 overflow-y-auto rounded-2xl border border-black/20 bg-white/75 p-5 text-black shadow-lg backdrop-blur-md"
                }>
                    {files.length > 0 ? (
                        files.map((file, index) => (
                            <div
                                key={index}
                                className={
                                    darkMode
                                        ? "mb-2 rounded-lg bg-white/10 px-4 py-2 text-white"
                                        : "mb-2 rounded-lg border border-black/10 bg-black/5 px-4 py-2 font-medium text-black"
                                }
                            >
                                {activeMode === "folder" ? (file.webkitRelativePath || file.name) : file.name}
                            </div>
                        ))
                    ) : (
                        <div className={darkMode ? "text-white/50" : "text-black/50"}>No files selected</div>
                    )}
                </div>
            )}

            <div className="absolute left-6/13 top-92 -translate-x-1/2">
                <SendRet
                  activeMode={activeMode}
                  text={text}
                  files={files}
                                    darkMode={darkMode}
                />
            </div>
        </>
    );
}

export default ActivePanel;