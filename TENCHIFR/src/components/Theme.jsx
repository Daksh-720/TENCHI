import { useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SlingButton from "./SlingButton";

function Theme({ darkMode, setDarkMode, onToggleTheme }) {
  const buttonRef = useRef(null);

  function toggleTheme() {
    let origin = null;
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      origin = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    if (onToggleTheme) {
      onToggleTheme(origin);
    } else if (setDarkMode) {
      setDarkMode((current) => !current);
    }
  }

  // Colors aligned with TENCHI's UI theme (#00D2FF cyan, #737FF2 periwinkle, #A78BFA lavender, #F5EBDD cream, #121216 obsidian)
  const padColor = darkMode ? "#16161e" : "#ffffff";
  const iconColor = darkMode ? "#00D2FF" : "#454C91";
  const accentColor = darkMode ? "#00D2FF" : "#737FF2";
  const wellColor = darkMode ? "rgba(0, 210, 255, 0.14)" : "rgba(115, 127, 242, 0.18)";
  const bandColor = darkMode ? "rgba(0, 210, 255, 0.45)" : "rgba(0, 210, 255, 0.55)";

  return (
    <span ref={buttonRef} className="inline-flex items-center justify-center">
      <SlingButton
        onSend={toggleTheme}
        size={38}
        padColor={padColor}
        iconColor={iconColor}
        accentColor={accentColor}
        wellColor={wellColor}
        bandColor={bandColor}
        strokeWidth={2.5}
        armAt={26}
        maxPull={75}
        launchSpeed={1200}
        recoil={0.28}
        flight={80}
        particles={16}
        spread={55}
        axis="any"
        tapSends={false}
        ariaLabel={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title="pull n release to switch theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={darkMode ? "sun" : "moon"}
            initial={{ rotate: -90, scale: 0.2, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.2, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            {darkMode ? (
              <Sun size={19} strokeWidth={2.2} />
            ) : (
              <Moon size={19} strokeWidth={2.2} />
            )}
          </motion.span>
        </AnimatePresence>
      </SlingButton>
    </span>
  );
}

export default Theme;