import { useState } from "react";

function Theme(){
    const [darkMode, setDarkMode] = useState(false);

    function toggleTheme(){
        setDarkMode(!darkMode);
    }

    return(
        <button onClick={toggleTheme}
        className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition hover:bg-white/1">
            {darkMode?"Light":"dark"}
        </button>
    )
}
export default Theme