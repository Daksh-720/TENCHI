import { useState } from "react";
import SendRet from "./SendRet";



function Text() {
    const [showTextArea, setShowTextArea] = useState(true);
    return (
        <div>
            <button
             onClick={() => setShowTextArea(!showTextArea)}
             className="flex h-27 w-27 flex-col items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">

                <div className="text-3xl">📝</div>
                Text
             </button>

             {showTextArea && (
                <>
                <textarea
                 placeholder="Enter Text..."
                 className="absolute left-1/2 top-72 h-52 w-125 -translate-x-1/2 resize-none rounded-2xl border border-white/20 bg-white/10 p-5 text-white outline-none backdrop-blur-md placeholder:text-white/50 focus:border-white/40"
                />

                <div className="absolute left-1/3 top-127 -translate-x-1/2">
                 <SendRet/>
                </div>
                </>
             )}
        </div>
    );
}
export default Text