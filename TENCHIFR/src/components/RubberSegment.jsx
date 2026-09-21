import { useEffect, useState } from "react";
import { motion } from "motion/react";

const sizes = {
    sm: { height: 28, padding: 10, font: 12 },
    md: { height: 36, padding: 14, font: 13 },
    lg: { height: 44, padding: 18, font: 14 },
};

function RubberSegment({
    items,
    value,
    defaultValue,
    onChange,
    trackColor = "#27272a",
    thumbColor = "#fafafa",
    textColor = "#fafafa",
    activeTextColor = "#18181b",
    separatorColor = "rgba(255,255,255,0.2)",
    size = "md",
    radius = 10,
    disabled = false,
    vertical = false,
    className = "",
    "aria-label": ariaLabel = "Segmented control",
}) {
    const normalizedItems = items.map((item) =>
        typeof item === "string" ? { value: item, label: item } : item
    );
    const [internalValue, setInternalValue] = useState(
        defaultValue ?? normalizedItems[0]?.value
    );
    const selectedValue = value ?? internalValue;
    const selectedIndex = Math.max(
        0,
        normalizedItems.findIndex((item) => item.value === selectedValue)
    );
    const preset = sizes[size] ?? sizes.md;

    useEffect(() => {
        if (value !== undefined) return;
        if (!normalizedItems.some((item) => item.value === internalValue)) {
            setInternalValue(normalizedItems[0]?.value);
        }
    }, [internalValue, normalizedItems, value]);

    function select(index) {
        const nextValue = normalizedItems[index]?.value;
        if (disabled || nextValue === undefined) return;
        if (value === undefined) setInternalValue(nextValue);
        onChange?.(nextValue, index);
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            select(Math.min(normalizedItems.length - 1, selectedIndex + 1));
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            select(Math.max(0, selectedIndex - 1));
        }
    }

    return (
        <div
            role="radiogroup"
            aria-label={ariaLabel}
            aria-disabled={disabled || undefined}
            className={`relative grid ${vertical ? "grid-flow-row auto-rows-fr" : "grid-flow-col auto-cols-fr"} gap-1 p-1 select-none ${disabled ? "pointer-events-none opacity-50" : ""} ${className}`}
            style={{
                minHeight: vertical ? 260 : preset.height,
                minWidth: vertical ? 80 : undefined,
                borderRadius: radius,
                background: trackColor,
            }}
        >
            <motion.div
                aria-hidden="true"
                className={vertical ? "absolute inset-x-1 top-1" : "absolute inset-y-1 left-1"}
                animate={vertical ? {
                    y: `calc(${selectedIndex * 100}% + ${selectedIndex * 4}px)`,
                } : {
                    x: `calc(${selectedIndex * 100}% + ${selectedIndex * 4}px)`,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
                style={{
                    borderRadius: Math.max(0, radius - 3),
                    background: thumbColor,
                    height: vertical ? `calc((100% - ${(normalizedItems.length - 1) * 4}px) / ${normalizedItems.length})` : undefined,
                    width: !vertical ? `calc((100% - ${(normalizedItems.length - 1) * 4}px) / ${normalizedItems.length})` : undefined,
                }}
            />
            {normalizedItems.map((item, index) => (
                <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={index === selectedIndex}
                    tabIndex={index === selectedIndex ? 0 : -1}
                    onClick={() => select(index)}
                    onKeyDown={handleKeyDown}
                    className="relative z-10 border-0 bg-transparent px-3 font-medium leading-none outline-none transition focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{
                        minHeight: vertical ? preset.height - 9 : undefined,
                        minWidth: vertical ? 72 : undefined,
                        paddingBlock: vertical ? 20 : undefined,
                        paddingBottom: vertical ? 18 : undefined,
                        paddingInline: preset.padding,
                        fontSize: preset.font,
                        color: index === selectedIndex ? activeTextColor : textColor,
                        borderTop: vertical && index > 0 ? `1px solid ${separatorColor}` : undefined,
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