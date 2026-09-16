
function Theme({ darkMode, setDarkMode }) {

    function toggleTheme(){
        setDarkMode(!darkMode);
    }

    return(
        <button onClick={toggleTheme}
            className={`rounded-xl border px-4 py-2 backdrop-blur-md transition ${
                darkMode
                    ? "border-white/20 bg-white/10 text-white"
                    : "border-black/20 bg-black/5 text-black"
            }`}
        >
            {darkMode?"Light":"dark"}
        </button>
    )
}
export default Theme