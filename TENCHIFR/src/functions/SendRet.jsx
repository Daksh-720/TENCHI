import SetExpiry from "./SetExpiry";
import { useState } from "react";
import { API_BASE_URL } from "../config";
import { Copy, Check } from "lucide-react";

const CHARACTERS = "abcxyz0123456789";

function generateInstantCode() {
    let result = "";
    const cryptoObj = typeof window !== "undefined" && (window.crypto || window.msCrypto);
    if (cryptoObj && cryptoObj.getRandomValues) {
        const values = new Uint32Array(6);
        cryptoObj.getRandomValues(values);
        for (let i = 0; i < 6; i++) {
            result += CHARACTERS.charAt(values[i] % CHARACTERS.length);
        }
    } else {
        for (let i = 0; i < 6; i++) {
            result += CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length));
        }
    }
    return result;
}

function SendRet({ text, files, activeMode, darkMode }) {
    const [expiryTime, setExpiryTime] = useState("");
    const [expiryUnit, setExpiryUnit] = useState("minutes");
    const [shareCode, setShareCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        if (!shareCode) return;
        try {
            await navigator.clipboard.writeText(shareCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            // ignore clipboard permissions
        }
    }

    async function handleSend() {
        try {
            const token = localStorage.getItem("token");
            const authorization = token ? { Authorization: `Bearer ${token}` } : {};
            setError("");

            if (activeMode === "text" && !text.trim()) {
                setError("Please enter some text.");
                return;
            }
            if (!expiryTime || Number(expiryTime) <= 0) {
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
                : expiryUnit === "hours" ? Number(expiryTime) * 60
                : Number(expiryTime) * 24 * 60;

            if (expiryMinutes > 2880) {
                setError("Expiry cannot exceed 2 days.");
                return;
            }

            // INSTANT CODE GENERATION: runs in < 0.01ms
            const instantCode = generateInstantCode();
            setShareCode(instantCode);
            setLoading(true);

            if (activeMode === "text") {
                const response = await fetch(`${API_BASE_URL}/clips`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        ...authorization
                    },
                    body: JSON.stringify({
                        content: text,
                        expiryMinutes: expiryMinutes,
                        shareCode: instantCode
                    })
                });

                if (!response.ok) {
                    const message = await response.text();
                    throw new Error(message || `Failed to save clip (${response.status})`);
                }

                const data = await response.json();
                if (data.shareCode && data.shareCode !== instantCode) {
                    setShareCode(data.shareCode);
                }
            }

            if (
                activeMode === "files" ||
                activeMode === "folder" ||
                activeMode === "image" ||
                activeMode === "video"
            ) {
                const formData = new FormData();

                if (files.length === 1) {
                    formData.append("file", files[0]);
                    formData.append("expiryMinutes", expiryMinutes);
                    formData.append("shareCode", instantCode);

                    const response = await fetch(`${API_BASE_URL}/file`, {
                        method: "POST",
                        headers: authorization,
                        body: formData
                    });

                    if (!response.ok) {
                        const message = await response.text();
                        throw new Error(message || `Upload failed (${response.status})`);
                    }

                    const data = await response.json();
                    if (data.shareCode && data.shareCode !== instantCode) {
                        setShareCode(data.shareCode);
                    }
                } else {
                    files.forEach((file) => {
                        formData.append("files", file);
                    });

                    formData.append("expiryMinutes", expiryMinutes);
                    formData.append("shareCode", instantCode);

                    const response = await fetch(`${API_BASE_URL}/files`, {
                        method: "POST",
                        headers: authorization,
                        body: formData
                    });

                    if (!response.ok) {
                        const message = await response.text();
                        throw new Error(message || `Upload failed (${response.status})`);
                    }

                    const data = await response.json();
                    if (data.shareCode && data.shareCode !== instantCode) {
                        setShareCode(data.shareCode);
                    }
                }
            } 
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            setShareCode("");
        } finally {
            setLoading(false);
        }
    } 

    return (
        <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleSend}
                    className={
                        darkMode
                            ? "h-12 w-full sm:w-auto rounded-xl border-2 border-[#00D2FF]/60 bg-[#A78BFA]/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-[#737FF2]/40 hover:backdrop-blur-xl cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                            : "h-12 w-full sm:w-auto rounded-xl border-2 border-[#00D2FF]/90 bg-[#737FF2]/40 px-8 py-3 font-semibold text-turquoise backdrop-blur-md transition hover:bg-[#454C91]/40 hover:text-white hover:backdrop-blur-xl cursor-pointer disabled:opacity-75 disabled:cursor-wait"
                    }
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span>SAVING...</span>
                        </span>
                    ) : (
                        "SEND"
                    )}
                </button>

                <div className="relative w-full sm:w-48 md:w-52">
                    <input
                        type="text"
                        placeholder="Generated-code:"
                        value={shareCode ? `Code: ${shareCode}` : ""}
                        readOnly
                        onClick={handleCopy}
                        title={shareCode ? "Click to copy code" : undefined}
                        className={`h-12 w-full rounded-xl border px-4 py-3 text-center sm:text-left font-mono font-bold tracking-wider backdrop-blur-md transition ${
                            shareCode ? "cursor-pointer select-all" : ""
                        } ${
                            darkMode
                                ? "border-white/20 bg-white/10 text-cyan-300 placeholder:text-white/40 hover:border-cyan-400/50"
                                : "border-black/20 bg-white/50 text-indigo-900 placeholder:text-black/40 hover:border-indigo-400"
                        }`}
                    />
                    {shareCode && (
                        <button
                            type="button"
                            onClick={handleCopy}
                            title="Click to copy code"
                            className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 transition cursor-pointer ${
                                darkMode ? "hover:bg-white/20 text-white/70" : "hover:bg-black/10 text-black/70"
                            }`}
                        >
                            {copied ? (
                                <Check size={16} className="text-emerald-400" />
                            ) : (
                                <Copy size={16} />
                            )}
                        </button>
                    )}
                </div>

                <div className="w-full sm:w-auto flex justify-center">
                    <SetExpiry 
                        expiryTime={expiryTime}
                        setExpiryTime={setExpiryTime}
                        expiryUnit={expiryUnit}
                        setExpiryUnit={setExpiryUnit}
                        darkMode={darkMode}
                    />
                </div>
            </div>

            {copied && (
                <p className="text-xs text-emerald-400 font-medium animate-pulse">
                    Code copied to clipboard!
                </p>
            )}

            {error && (
                <p className="text-sm text-red-400 text-center">
                    {error}
                </p>
            )}
        </div>
    );
}

export default SendRet;