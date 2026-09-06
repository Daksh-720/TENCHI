import { useState, useEffect, useRef } from "react";
import Login from "../functions/Login";
import Register from "../functions/Register";

function HamBurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className="relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl transition hover:bg-white/10"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <span className="text-xl leading-none text-white">✕</span>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="block h-0.5 w-5 rounded bg-white"></span>
            <span className="block h-0.5 w-5 rounded bg-white"></span>
            <span className="block h-0.5 w-5 rounded bg-white"></span>
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-white/20 bg-black/80 p-1.5 shadow-2xl backdrop-blur-xl z-50">
          <button
            onClick={() => {
              setAuthMode("login");
              setMenuOpen(false);
            }}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-white transition hover:bg-white/15 cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => {
              setAuthMode("register");
              setMenuOpen(false);
            }}
            className="w-full rounded-lg px-4 py-2 text-left text-sm text-white transition hover:bg-white/15 cursor-pointer"
          >
            Register
          </button>
        </div>
      )}

      {/* Auth Modals */}
      {authMode === "login" && (
        <Login setAuthMode={setAuthMode} />
      )}
      {authMode === "register" && (
        <Register setAuthMode={setAuthMode} />
      )}
    </div>
  );
}

export default HamBurgerMenu;