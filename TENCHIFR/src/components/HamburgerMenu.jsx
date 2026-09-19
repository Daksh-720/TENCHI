import { useState, useEffect, useRef } from "react";
import Login from "../functions/Login";
import Register from "../functions/Register";

function HamBurgerMenu({ darkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);
  const menuRef = useRef(null);

  
  useEffect(() => {
  function handleClickOutside(event) {
    if (authMode !== null) return;
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, [authMode]);

  return (
    <>
    <div className="relative" ref={menuRef}>
        <button
        onClick={() => setMenuOpen((prev) => !prev)}
        className={
                    darkMode
                        ? "relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl transition hover:bg-white/10"
                        : "relative z-50 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl transition hover:bg-black/10"
                }aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? (
          <span className={
                            darkMode
                                ? "text-xl leading-none text-white"
                                : "text-xl leading-none text-black"
                        }>✕</span>

        ) : (

                <div className="flex flex-col items-center justify-center gap-1.5">
                  <span className={darkMode ? "block h-0.5 w-5 rounded bg-white" : "block h-0.5 w-5 rounded bg-black"}></span>
                  <span className={darkMode ? "block h-0.5 w-5 rounded bg-white" : "block h-0.5 w-5 rounded bg-black"}></span>
                  <span className={darkMode ? "block h-0.5 w-5 rounded bg-white" : "block h-0.5 w-5 rounded bg-black"}></span>
                </div>
        )}
        </button>

      
      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-white/20 bg-black/80 p-1.5 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => {
              setAuthMode("login");
              setMenuOpen(false);
            }}
            className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm text-white transition hover:bg-white/15"
          >
            Login
          </button>

          <button
            onClick={() => {
              setAuthMode("register");
              setMenuOpen(false);
            }}
            className="w-full cursor-pointer rounded-lg px-4 py-2 text-left text-sm text-white transition hover:bg-white/15"
          >
            Register
          </button>
        </div>
      )}

      </div> {/* closes div ref={menuRef} */}

      {/* Auth Modals sit outside the ref */}
      {authMode === "login" && <Login setAuthMode={setAuthMode} />}
      {authMode === "register" && <Register setAuthMode={setAuthMode} />}
    </>
  );
}

export default HamBurgerMenu;