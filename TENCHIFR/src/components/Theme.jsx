import { HugeiconsIcon } from "@hugeicons/react";
import { Sun02Icon, Moon02Icon } from "@hugeicons/core-free-icons";
import SlingButton from "./SlingButton";

function Theme({ darkMode, setDarkMode }) {
  function toggleTheme() {
    setDarkMode((current) => !current);
  }

  // Colors aligned with TENCHI's UI theme (#00D2FF cyan, #737FF2 periwinkle, #A78BFA lavender, #F5EBDD cream, #121216 obsidian)
  const padColor = darkMode ? "#16161e" : "#ffffff";
  const iconColor = darkMode ? "#00D2FF" : "#454C91";
  const accentColor = darkMode ? "#00D2FF" : "#737FF2";
  const wellColor = darkMode ? "rgba(0, 210, 255, 0.14)" : "rgba(115, 127, 242, 0.18)";
  const bandColor = darkMode ? "rgba(0, 210, 255, 0.45)" : "rgba(0, 210, 255, 0.55)";

  return (
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
      title="pull n release"
    >
      <HugeiconsIcon
        icon={darkMode ? Sun02Icon : Moon02Icon}
        size={19}
        strokeWidth={2.2}
      />
    </SlingButton>
  );
}

export default Theme;