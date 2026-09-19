import { useEffect, useRef, useState } from "react";
import { History as HistoryIcon, LogOut } from "lucide-react";

function getUser(token) {
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const emailName = payload.sub?.split("@")[0] || "";
        const parts = emailName.split(/[._-]+/).filter(Boolean);
        const initials = (parts.length > 1
            ? `${parts[0][0]}${parts[1][0]}`
            : emailName.slice(0, 2)
        ).toUpperCase();
        return { email: payload.sub, initials };
    } catch {
        return null;
    }
}

function ProfileAvatar({ darkMode, onHistory, className = "relative" }) {
    const [user, setUser] = useState(() => getUser(localStorage.getItem("token")));
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function updateAvatar() {
            setUser(getUser(localStorage.getItem("token")));
        }

        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        window.addEventListener("tenchi-authenticated", updateAvatar);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("tenchi-authenticated", updateAvatar);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!user?.initials) return null;

    function signOut() {
        localStorage.removeItem("token");
        setUser(null);
        setMenuOpen(false);
    }

    return (
        <div ref={menuRef} className={className}>
            <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className={darkMode
                    ? "flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white/25"
                    : "flex h-11 w-11 items-center justify-center rounded-full border border-black/20 bg-white/70 text-sm font-bold text-black shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-white"}
                aria-label={`Signed in as ${user.initials}`}
            >
                {user.initials}
            </button>

            {menuOpen && (
                <div className={darkMode
                    ? "absolute left-0 top-14 w-64 rounded-2xl border border-white/15 bg-[#171719] p-3 text-white shadow-2xl"
                    : "absolute left-0 top-14 w-64 rounded-2xl border border-black/10 bg-[#fffaf2] p-3 text-black shadow-xl"}>
                    <div className="border-b border-current/10 px-3 pb-3">
                        <p className="truncate font-semibold">{user.email?.split("@")[0]}</p>
                        <p className="truncate text-sm opacity-60">{user.email}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setMenuOpen(false);
                            onHistory?.();
                        }}
                        className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-current/10"
                    >
                        <HistoryIcon size={17} />
                        History
                    </button>

                    <button
                        type="button"
                        onClick={signOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 transition hover:bg-red-500/10"
                    >
                        <LogOut size={17} />
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProfileAvatar;
