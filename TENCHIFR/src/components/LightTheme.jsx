import { memo } from "react";

function LightTheme() {
    return (
        <div className="absolute inset-0 bg-[#F5EBDD] pointer-events-none overflow-hidden" style={{ contain: "strict" }}>
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M 24 0 L 0 0 0 24' fill='none' stroke='rgba(0,0,0,0.09)' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: "24px 24px",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                }}
            />
        </div>
    );
}

export default memo(LightTheme);