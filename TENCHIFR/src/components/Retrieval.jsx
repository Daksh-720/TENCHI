import { useState } from "react";
import { API_BASE_URL } from "../config";



function Retrieval({ darkMode }) {

    const [shareCode, setShareCode] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");



    function handleDownload(fileId = null){
        const code = shareCode.trim();
        const url = fileId
              ? `${API_BASE_URL}/clips/${code}/files/${fileId}/download`
              : `${API_BASE_URL}/clips/${code}/download`;

              window.open(url, "_blank");
    }


    async function handleRetrieve(){
        setError("");
        setResult(null);

        if(!shareCode.trim()){
            setError("Please Enter Share-Code");
            return;
        }

        try{
            const response = await fetch(
                `${API_BASE_URL}/clips/${shareCode.trim()}`
            );

            if(!response.ok){
                const message = await response.text();
                throw new Error(message);
            }

            const data = await response.json();
            setResult(data);
        } catch(err){
            setError(err.message || "Something went wrong. Please try again.");
        }
    }
    return (
        <section className="relative mt-[55vh] sm:mt-[65vh] lg:mt-[75vh] scroll-mt-24 sm:scroll-mt-28 mx-auto w-full max-w-[92vw] sm:max-w-125 mb-36 sm:mb-52">
            <div className={
                darkMode
                    ? "w-full text-center rounded-xl border border-white/40 bg-white/10 py-2.5 px-4 text-lg sm:text-xl font-semibold text-white backdrop-blur-md mb-4 shadow-sm"
                    : "w-full text-center rounded-xl border border-black/30 bg-white/60 py-2.5 px-4 text-lg sm:text-xl font-semibold text-black backdrop-blur-md mb-4 shadow-sm"
            }>
                Retrieve
            </div>

            <div className={
                darkMode
                    ? "h-44 sm:h-52 w-full rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md overflow-y-auto shadow-lg"
                    : "h-44 sm:h-52 w-full rounded-2xl border-2 border-black/20 bg-white/50 p-4 sm:p-5 backdrop-blur-md overflow-y-auto shadow-md"
            }>

            {result && result.contentType === "TEXT" && (
                <p className={darkMode ? "whitespace-pre-wrap text-amber-50 text-sm sm:text-base" : "whitespace-pre-wrap text-black text-sm sm:text-base"}>
                    {result.content}
                </p>
            )}

            {result && result.contentType !== "TEXT" && (
                <div className="space-y-2">
                    {result.files?.map((file) => (
                        <div
                            key={file.id}
                            className={darkMode
                                ? "flex items-center justify-between rounded-lg bg-white/10 px-3 sm:px-4 py-2 text-xs sm:text-sm text-amber-50"
                                : "flex items-center justify-between rounded-lg border border-black/10 bg-black/5 px-3 sm:px-4 py-2 text-xs sm:text-sm text-black"}>

                                <span className="truncate mr-2">{file.fileName}</span>

                                <button 
                                       onClick={() => handleDownload(file.id)}
                                       className={darkMode
                                           ? "shrink-0 cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-xs sm:text-sm transition hover:bg-white/20"
                                           : "shrink-0 cursor-pointer rounded-lg border border-black/20 bg-black/5 px-3 py-1 text-xs sm:text-sm text-black transition hover:bg-black/10"}>
                                        Download
                                       </button>
                            </div>
                    ))}
                </div>
            )}

            {!result && !error && (
                <p className={
                    darkMode
                        ? "text-white/50 text-xs sm:text-sm"
                        : "text-black/50 text-xs sm:text-sm"
                }>
                    Retrieved Content will Appear here...
                </p>
            )}

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            </div>

            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">

                <input
                    type="text"
                    placeholder="Code"
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value)}
                    className={
                        darkMode
                            ? "h-12 w-full sm:flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 backdrop-blur-md"
                            : "h-12 w-full sm:flex-1 rounded-xl border border-black/50 bg-white/50 px-4 text-black outline-none placeholder:text-black/50 backdrop-blur-md"
                    }
                />

                <button
                    type="button"
                    onClick={handleRetrieve}
                    className={
                        darkMode
                            ? "h-12 w-full sm:w-auto rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-[#737FF2]/40 hover:backdrop-blur-xl cursor-pointer"
                            : "h-12 w-full sm:w-auto rounded-xl border-2 border-[#00D2FF]/90 bg-[#737FF2]/40 px-8 py-3 font-semibold text-black backdrop-blur-md transition hover:bg-[#454C91]/40 hover:text-white hover:backdrop-blur-xl cursor-pointer"
                  }>
                    Retrieve
                </button>

            </div>
        </section>
    );
}

export default Retrieval;