import { useEffect, useState } from "react";
import { X } from "lucide-react";

function History({ darkMode, onClose }) {
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Log in to view your history.");
            setLoading(false);
            return;
        }

        fetch("http://localhost:8080/clips/history", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(async (response) => {
                if (!response.ok) throw new Error("Unable to load your history.");
                return response.json();
            })
            .then(setClips)
            .catch((requestError) => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
            <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
            <section className={darkMode
                ? "relative z-10 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/20 bg-[#121216] p-6 text-white shadow-2xl"
                : "relative z-10 max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-black/20 bg-[#fffaf2] p-6 text-black shadow-2xl"}>
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 cursor-pointer opacity-60 transition hover:opacity-100"
                    aria-label="Close history"
                >
                    <X size={20} />
                </button>

                <h2 className="mb-5 text-2xl font-semibold">Your History</h2>

                {loading && <p className="opacity-60">Loading history...</p>}
                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && clips.length === 0 && (
                    <p className="opacity-60">No active clips yet.</p>
                )}

                <div className="space-y-3">
                    {clips.map((clip) => (
                        <article
                            key={clip.id}
                            className={darkMode
                                ? "rounded-xl border border-white/15 bg-white/10 p-4"
                                : "rounded-xl border border-black/15 bg-black/5 p-4"}
                        >
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-semibold">{clip.shareCode}</span>
                                <span className="text-sm opacity-60">{clip.contentType}</span>
                            </div>
                            {clip.contentType === "TEXT" && (
                                <p className="mt-2 line-clamp-2 whitespace-pre-wrap text-sm opacity-80">
                                    {clip.content}
                                </p>
                            )}
                            {clip.files?.length > 0 && (
                                <p className="mt-2 text-sm opacity-80">
                                    {clip.files.map((file) => file.fileName).join(", ")}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default History;
