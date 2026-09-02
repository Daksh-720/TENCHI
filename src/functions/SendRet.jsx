import SetExpiry from "./SetExpiry";
import { useState } from "react";



function SendRet({ text, files, activeMode }){

    const [expiryTime, setExpiryTime] = useState("");
    const [expiryUnit, setExpiryUnit] = useState("minutes");

    function handleSend(){
        const sendData = {
            activeMode,
            text,
            files,
            expiryTime,
            expiryUnit
        };
    }

    return(
        <div className="flex items-center gap-4">
        <button onClick={handleSend} className="rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-8 py-3 text-white backdrop-blur-md transition hover:bg-[#737FF2]/40 hover:backdrop-blur-xl cursor-pointer">
         SEND
        </button>

        <input
        type="text"
        placeholder="Generated-code:"
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
    );
}

export default SendRet