import { useState } from "react";



function Retrieval(){

    const [shareCode, setShareCode] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");



    function handleDownload(fileId = null){
        const code = shareCode.trim();
        const url = fileId
              ? `http://localhost:8080/clips/${code}/files/${fileId}/download`
              : `http://localhost:8080/clips/${code}/download`;

              window.open(url, "_blank");
    }


    async function handleRetrieve(){
        setError("");
        setResult(null);

        if(!shareCode.trim){
            setError("Please Enter Share-Code");
            return;
        }

        try{
            const response = await fetch(
                `http://localhost:8080/clips/${shareCode.trim()}`
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
        <section className="relative mt-170 mx-auto w-125 mb-60">
            
                <div className="rounded-xl border border-white bg-white/10 px-54 py-2 text-xl font-semibold text-white backdrop-blur-md mb-4">
                Retrieve
                </div>
            

            <div className="h-52 w-full rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">

            {result && result.contentType === "TEXT" && (
                <p className="whitespace-pre-wrap">
                    {result.content}
                </p>
            )}

            {result && result.contentType !== "TEXT" && (
                <div className="space-y-2">
                    {result.files?.map((file) => (
                        <div 
                            key={file.id}
                            className="flex items-center justify-between rounded-lg bg-white/10 px-4 py-2">

                                <span>{file.fileName}</span>

                                <button 
                                       onClick={() => handleDownload(file.id)}
                                       className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1 text-sm transition hover:bg-white/20">
                                        Download
                                       </button>
                            </div>
                    ))}
                </div>
            )}

            {!result && !error && (
                <p className="text-white/50">
                    Retrieved Content will Appear here...
                </p>
            )}

            {error && (
                <p className="text-sm text-red-400">
                    {error}
                </p>
            )}

            </div>

            <div className="mt-5 flex items-center gap-4">

                <input
                    type="text"
                    placeholder="Code"
                    value={shareCode}
                    onChange={(e) => setShareCode(e.target.value)}
                    className="h-12 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 text-white outline-none placeholder:text-white/50 backdrop-blur-md"
                />

                <button
                    onClick={handleRetrieve}
                    className="cursor-pointer rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-6 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40"
                >
                    Retrieve
                </button>

            </div>
        </section>
    );
}

export default Retrieval;