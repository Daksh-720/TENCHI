import SetExpiry from "./SetExpiry";
import { useState } from "react";



function SendRet({ text, files, activeMode }){

    const [expiryTime, setExpiryTime] = useState("");
    const [expiryUnit, setExpiryUnit] = useState("minutes");
    const [shareCode, setShareCode] = useState("");
    const [error, setError] = useState("");


    async function handleSend(){
        setError("");
        if(activeMode === "text" && !text.trim()) {
            setError("Please enter some text.");
            return;
        }
        if(!expiryTime || Number(expiryTime) <= 0){
            setError("Please enter a valid expiry time.");
            return;
        }


        if (
            (activeMode === "files" ||
             activeMode === "folder" ||
             activeMode === "image" ||
             activeMode === "video") &&
             files.length === 0
        ) {
            setError("Please select a file.");
            return;
        }


        const expiryMinutes = 
        expiryUnit === "minutes" ? Number(expiryTime)
                                 : expiryUnit === "hours"
                                 ? Number(expiryTime) * 60
                                 : Number(expiryTime) * 24 * 60;
                                 if(expiryMinutes > 2880){
                                    setError("Expiry cannot exceed 2 days.");
                                    return;
                                 }

        
        if (activeMode === "text") {
            const response = await fetch("http://localhost:8080/clips", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    content: text,
                    expiryMinutes: expiryMinutes
                })
            });

            if(!response.ok){
                const message = await response.text();
                throw new Error(message);
            }

            const data = await response.json();
            setShareCode(data.shareCode);
        }

        if(
            activeMode === "files" ||
            activeMode === "folder" ||
            activeMode === "image" ||
            activeMode === "video"
        ){
            const formData = new FormData();

            if(files.length === 1) {
                formData.append("file", files[0]);
                formData.append("expiryMinutes", expiryMinutes);

                const response = await fetch("http://localhost:8080/file", {
                    method: "POST",
                    body: formData
                });

                if(!response.ok){
                    const message = await response.text();
                    throw new Error(message);
                }

                const data = await response.json();
                setShareCode(data.shareCode);

            } else{
                files.forEach((file) => {
                    formData.append("files", file);
                });

                formData.append("expiryMinutes", expiryMinutes);

                const response = await fetch("http://localhost:8080/files", {
                    method: "POST",
                    body: formData
                });

                if(!response.ok){
                    const message = await response.text();
                    throw new Error(message);
                }

                const data = await response.json();
                setShareCode(data.shareCode);

            }
        } 
    }

    return(
        <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
        <button onClick={handleSend} className="rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-8 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40 hover:backdrop-blur-xl cursor-pointer">
         SEND
        </button>

        <input
        type="text"
        placeholder="Generated-code:"
        value={shareCode}
        readOnly
        className="h-12 w-48 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white backdrop-blur-md"
        />

        <SetExpiry 
        expiryTime={expiryTime}
        setExpiryTime={setExpiryTime}
        expiryUnit={expiryUnit}
        setExpiryUnit={setExpiryUnit}
        />

        </div>

        {error && (
            <p className="text-sm text-red-400">
                {error}
            </p>
        )}
        </div>
    );
}

export default SendRet