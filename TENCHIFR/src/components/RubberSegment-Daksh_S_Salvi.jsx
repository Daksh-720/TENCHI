import { useRef, useState } from "react";
import { motion } from "motion/react";

const sizes = {
    sm: { height: 28, font: 12, padding: 10 },
    md: { height: 36, font: 13, padding: 14 },
    lg: { height: 44, font: 14, padding: 18 },
};

function RubberSegment({
    items,
    defaultValue,
    onChange,
    trackColor = "#27272a",
    thumbColor = "#fafafa",
    textColor = "#fafafa",
    activeTextColor = "#18181b",
    size = "md",
    radius = 10,
    draggable = true,
    disabled = false,
    className = "",
    "aria-label": ariaLabel = "Segmented control",
}) {
    const list = items.map((item) =>
        typeof item === "string" ? { value: item, label: item } : item
    );
    const [selected, setSelected] = useState(
        defaultValue ?? list[0]?.value
    );
    const trackRef = useRef(null);
    const dragRef = useRef(false);
    const preset = sizes[size] ?? sizes.md;
    const index = Math.max(0, list.findIndex((item) => item.value === selected));

    function choose(nextIndex) {
        if (disabled || !list[nextIndex]) return;
        const nextValue = list[nextIndex].value;
        setSelected(nextValue);
        onChange?.(nextValue, nextIndex);
    }

    function chooseFromPointer(event) {
        if (!trackRef.current || disabled) return;
        const rect = trackRef.current.getBoundingClientRect();
        const slotWidth = rect.width / list.length;
        choose(Math.max(0, Math.min(list.length - 1, Math.floor((event.clientX - rect.left) / slotWidth))));
    }

    function handleKeyDown(event) {
        let next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(list.length - 1, index + 1);
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, index - 1);
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = list.length - 1;
        if (next !== null) {
            event.preventDefault();
            choose(next);
        }
    }

    return (
        <div
            ref={trackRef}
            role="radiogroup"
            aria-label={ariaLabel}
            aria-disabled={disabled || undefined}
            className={`relative inline-grid grid-flow-col auto-cols-fr gap-1 p-1 select-none ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
            style={{ minHeight: preset.height, borderRadius: radius, background: trackColor }}
            onPointerMove={(event) => {
                if (dragRef.current) chooseFromPointer(event);
            }}
            onPointerUp={() => {
                dragRef.current = false;
            }}
            onPointerLeave={() => {
                dragRef.current = false;
            }}
        >
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-1 left-1"
                animate={{
                    x: `calc(${index * 100}% + ${index * 4}px)`,
                    width: `calc((100% - ${(list.length - 1) * 4}px) / ${list.length})`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                style={{ borderRadius: Math.max(0, radius - 3), background: thumbColor }}
            />

            {list.map((item, itemIndex) => (
                <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={itemIndex === index}
                    tabIndex={itemIndex === index ? 0 : -1}
                    onClick={() => choose(itemIndex)}
                    onPointerDown={() => {
                        if (draggable) dragRef.current = true;
                    }}
                    onKeyDown={handleKeyDown}
                    className="relative z-10 inline-flex items-center justify-center gap-1.5 border-0 bg-transparent font-medium leading-none outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                        minHeight: preset.height - 8,
                        paddingInline: preset.padding,
                        fontSize: preset.font,
                        color: itemIndex === index ? activeTextColor : textColor,
                    }}
                >
                    {item.icon}
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default RubberSegment;