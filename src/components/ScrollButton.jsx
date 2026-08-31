import { useEffect, useState } from "react";



function ScrollButton() {
    const [atRetrieve, setAtRetrieve] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setAtRetrieve(window.scrollY > window.innerHeight*0.5);
        }
        window.addEventListener("scroll", handleScroll);

        return() => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    function handleClick() {
        if(atRetrieve) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
        else{
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth"
            });
        }
    }

    return (
        <button
         onClick={handleClick}
         className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl text-white backdrop-blur-md transition hover:bg-white/20">

            {atRetrieve ? "↑" : "↓"}
         </button>
    );
}

export default ScrollButton;