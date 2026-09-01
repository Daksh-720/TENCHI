import { useState } from "react";
import Login from "../functions/Login";
import Register from "../functions/Register";



function HamBurgerMenu(){

    const [menuOpen, setMenuOpen] = useState(false);
    const [authMode, setAuthMode] = useState(null);
    
    return (
        <div className="relative">
        <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="relative z-50 flex h-11 w-11 flex-col items-center cursor-pointer justify-center gap-1.5"
        aria-label={menuOpen ? "Close menu" : "Open menu"}>

        {menuOpen ? (
            <span className="text-2xl text-white"> X </span>
        ) : (
            <div className="flex flex-col items-center justify-center gap-1.5">
            <span className="block h-0.5 w-6 rounded bg-white"></span>
            <span className="block h-0.5 w-6 rounded bg-white"></span>
            <span className="block h-0.5 w-6 rounded bg-white"></span>
            </div>
            )}
        </button>

        {menuOpen && (
            <div className="absolute right-0 mt-3 w-40 rounded-xl border border-white/20 bg-white/10 p-2 backdrop-blur-md">

            <button
             onClick={() => {
                setAuthMode("login");
                setMenuOpen(false);
             }}
             className="w-full rounded-lg px-4 py-2 text-left text-white hover:bg-white/10">
             Login
            </button>


            <button
             onClick={() => {
                setAuthMode("register");
                setMenuOpen(false);
             }}
             className="w-full rounded-lg px-4 py-2 text-left text-white hover:bg-white/10">
             Register
            </button>
            </div>
        )}
            {authMode === "login" && (<Login setAuthMode={setAuthMode}/>)}
            {authMode === "register" && (<Register setAuthMode={setAuthMode} />)}

        </div>
    );
}

export default HamBurgerMenu;