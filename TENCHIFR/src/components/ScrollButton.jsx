import RubberSegment from "./RubberSegment";
import { PackageOpen, Send as SendIcon } from "lucide-react";

function ScrollButton({ darkMode, sendRef, retrieveRef }) {
    return (
        <div className="fixed w-18 top-1/2 right-17 z-50 -translate-y-1/2">
            <RubberSegment
                items={[
                    { value: "Send", label: "SEND", icon: <SendIcon size={24} strokeWidth={1.5} /> },
                    { value: "Retrieve", label: "RETRIEVE", icon: <PackageOpen size={24} strokeWidth={1.5} /> },
                ]}
                defaultValue="Send"
                onChange={(value) => {
                    if (value === "Send") {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        return;
                    }

                    retrieveRef?.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }}
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