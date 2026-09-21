import { useEffect, useState } from "react";
import RubberSegment from "./RubberSegment";
import { PackageOpen, Send as SendIcon } from "lucide-react";

function ScrollButton({ darkMode, sendRef, retrieveRef }) {
    const [selected, setSelected] = useState("Send");

    useEffect(() => {
        let ticking = false;

        function handleScroll() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                if (!retrieveRef?.current) return;
                const rect = retrieveRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.5) {
                    setSelected("Retrieve");
                } else {
                    setSelected("Send");
                }
            });
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [retrieveRef]);

    function scrollToSection(value) {
        setSelected(value);
        if (value === "Send") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        if (retrieveRef?.current) {
            const navbarOffset = 96;
            const targetY =
                retrieveRef.current.getBoundingClientRect().top +
                window.pageYOffset -
                navbarOffset;

            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: "smooth",
            });
        }
    }

    return (
        <div className="fixed w-18 top-1/2 right-2 sm:right-5 md:right-8 lg:right-16 z-40 -translate-y-1/2 scale-80 sm:scale-90 md:scale-100 origin-right transition-all duration-300">
            <RubberSegment
                items={[
                    { value: "Send", label: "SEND", icon: <SendIcon size={24} strokeWidth={1.5} /> },
                    { value: "Retrieve", label: "RETRIEVE", icon: <PackageOpen size={24} strokeWidth={1.5} /> },
                ]}
                value={selected}
                onChange={scrollToSection}
                trackColor={darkMode ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.65)"}
                thumbColor={darkMode ? "#fafafa" : "#111827"}
                textColor={darkMode ? "#fafafa" : "#111827"}
                activeTextColor={darkMode ? "#18181b" : "#ffffff"}
                separatorColor={darkMode ? "rgba(255,255,255,0.25)" : "rgba(17,24,39,0.25)"}
                radius={24}
                size="md"
                vertical
                draggable
                aria-label="Move between sending and retrieving"
            />
        </div>
    );
}

export default ScrollButton;