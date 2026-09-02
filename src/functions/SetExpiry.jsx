import { useState } from "react";
import { Timer } from "lucide-react";


function SetExpiry(){

    const [showTimer, setShowTimer] = useState(false);
    const [time, setTime] = useState("");
    const [unit, setUnit] = useState("minutes");

    function handleSetExpiry(){
        if(!time || Number(time) <= 0) {
            return;
        }
        console.log("Expiry: ", time, unit);
        setShowTimer(false);
    }

     return (
        <div className="relative">

            <button
                onClick={() => setShowTimer(!showTimer)}
                className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-1 text-white backdrop-blur-md transition hover:bg-white/20"
            >
                <Timer size={18} />
                Set Expiry
            </button>

            {showTimer && (
                <div className="absolute left-0 top-12 z-50 w-64 rounded-xl border border-white/20 bg-black/70 p-4 backdrop-blur-xl">

                    <p className="mb-3 text-sm text-white/70">
                        Expire after
                    </p>

                    <div className="flex gap-2">

                        <input
                            type="number"
                            min="1"
                            placeholder="Time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="h-10 w-24 rounded-lg border border-white/20 bg-white/10 px-3 text-white outline-none placeholder:text-white/40"
                        />

                        <select
                            value={unit}
                            placeholder="Minutes"
                            onChange={(e) => setUnit(e.target.value)}
                            className="h-10 flex-1 rounded-lg border border-white/20 bg-white/10 px-2 text-white outline-none"
                        >
                            <option value="minutes" className="bg-white text-black">Minutes</option>
                            <option value="hours" className="bg-white text-black">Hours</option>
                            <option value="days" className="bg-white text-black">Days</option>
                        </select>

                    </div>

                    <div className="mt-4 flex justify-end gap-2">

                        <button
                            onClick={() => setShowTimer(false)}
                            className="cursor-pointer rounded-lg px-3 py-2 text-sm text-white/60 transition hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSetExpiry}
                            className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                        >
                            Set
                        </button>

                    </div>

                </div>
            )}

        </div>
    );
}

export default SetExpiry;