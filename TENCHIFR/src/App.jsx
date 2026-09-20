import { useRef, useState } from "react";
import "./App.css";
import HamBurgerMenu from "./components/HamburgerMenu";
import GalaxyBg from './components/GalaxyBg';
import Theme from "./components/Theme";
import ThemeTransition from "./components/ThemeTransition";
import Text from "./functions/Text";
import Folder from "./functions/Folder";
import Image from "./functions/Image";
import Video from "./functions/Video";
import Filess from "./functions/Filess";
import ActivePanel from "./functions/ActivePanel";
import Retrieval from "./components/Retrieval";
import ScrollButton from "./components/ScrollButton";
import OAuth from "./auth/OAuth";
import LightTheme from "./components/LightTheme";
import History from "./components/History";
import ProfileAvatar from "./components/ProfileAvatar";


function App(){
  const [darkMode, setDarkMode] = useState(false);
  const [themeTransition, setThemeTransition] = useState(null);
  const [activeMode, setActiveMode] = useState("text");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const sendRef = useRef(null);
  const retrieveRef = useRef(null);

  const handleToggleTheme = (origin) => {
    const nextMode = !darkMode;
    setThemeTransition({
      toDark: nextMode,
      origin: origin || { x: window.innerWidth - 60, y: 44 },
      key: Date.now(),
    });
    setDarkMode(nextMode);
  };

  const isGalaxyActive = darkMode || themeTransition !== null;

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-700 ease-in-out ${darkMode ? "bg-black text-white" : "bg-[#F3EBDD] text-black"}`}>
      <ThemeTransition
        transition={themeTransition}
        onComplete={() => setThemeTransition(null)}
      />
      <OAuth />
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-5 md:p-6 pointer-events-none">
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <ProfileAvatar darkMode={darkMode} onHistory={() => setHistoryOpen(true)} />
          <div
            className={`hidden md:flex h-10 sm:h-11 items-center whitespace-nowrap rounded-full border px-3 sm:px-4 text-xs backdrop-blur-md transition-all duration-700 ease-in-out ${
              darkMode
                ? "border-white/50 bg-black/40 text-white"
                : "border-black/50 bg-white/70 text-black shadow-md"
            }`}
          >
            Online Data Sharing Platform
          </div>
          <div
            className={`sm:hidden whitespace-nowrap rounded-xl border px-3 py-1.5 text-sm font-bold tracking-[0.2em] backdrop-blur-md transition-all duration-700 ease-in-out ${
              darkMode
                ? "border-white/50 bg-black/40 text-white"
                : "border-black/50 bg-white/70 text-black shadow-md"
            }`}
          >
            ＴΞNCHI
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <div
            className={`hidden sm:block whitespace-nowrap rounded-xl border px-3.5 py-1.5 sm:px-4 sm:py-2 text-base md:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] backdrop-blur-md transition-all duration-700 ease-in-out ${
              darkMode
                ? "border-white/50 bg-black/40 text-white"
                : "border-black/50 bg-white/70 text-black shadow-md"
            }`}
          >
            ＴΞNCHI
          </div>

          <nav className={`relative flex items-center gap-1.5 sm:gap-2 rounded-2xl sm:rounded-3xl border p-1.5 sm:p-2 shadow-lg backdrop-blur-md transition-all duration-700 ease-in-out ${
            darkMode
              ? "border-white/10 bg-white/7"
              : "border-black/10 bg-white/30"
          }`}>
            <HamBurgerMenu
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              onHistory={() => setHistoryOpen(true)}
            />
            <Theme darkMode={darkMode} setDarkMode={setDarkMode} onToggleTheme={handleToggleTheme} />
          </nav>
        </div>
      </header>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${darkMode ? "opacity-100" : "opacity-0"}`}
          style={{ display: isGalaxyActive ? "block" : "none" }}
        >
          <GalaxyBg paused={!isGalaxyActive} />
        </div>
        <div
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${darkMode ? "opacity-0" : "opacity-100"}`}
          style={{ display: !darkMode || themeTransition !== null ? "block" : "none" }}
        >
          <LightTheme />
        </div>
      </div>

      <main className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-16 px-3 sm:px-4 flex flex-col items-center">
        <div ref={sendRef} className="w-full flex justify-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2.5 md:gap-3">
              <Text activeMode={activeMode} setActiveMode={setActiveMode} darkMode={darkMode} />
              <Filess activeMode={activeMode} setActiveMode={setActiveMode} files={files} setFiles={setFiles} darkMode={darkMode} />
              <Folder activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
              <Image activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
              <Video activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
            </div>

            <ActivePanel activeMode={activeMode} files={files} text={text} setText={setText} darkMode={darkMode} />
          </div>
        </div>

        <div ref={retrieveRef} className="w-full scroll-mt-24 sm:scroll-mt-28">
          <Retrieval darkMode={darkMode} />
        </div>
      </main>
    <ScrollButton darkMode={darkMode} sendRef={sendRef} retrieveRef={retrieveRef} />
    {historyOpen && (
      <History darkMode={darkMode} onClose={() => setHistoryOpen(false)} />
    )}
    </div>
  );
}
export default App;