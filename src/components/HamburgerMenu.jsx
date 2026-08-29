function HamBurgerMenu(){
    return (
        <button className="flex h-11 w-11 flex-col items-center justify-center gap-1.5" aria-label="Open menu">
            <span className="block h-0.5 w-6 rounded bg-white"></span>
            <span className="block h-0.5 w-6 rounded bg-white"></span>
            <span className="block h-0.5 w-6 rounded bg-white"></span>
        </button>
    )
}

export default HamBurgerMenu;