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

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-700 ease-in-out ${darkMode ? "bg-black text-white" : "bg-[#F3EBDD] text-black"}`}>
      <ThemeTransition
        transition={themeTransition}
        onComplete={() => setThemeTransition(null)}
      />
      <OAuth />
      <div className="fixed top-6 left-6 z-50 flex items-center gap-3">
        <ProfileAvatar darkMode={darkMode} onHistory={() => setHistoryOpen(true)} />
        <div
          className={`flex h-11 items-center whitespace-nowrap rounded-full border px-4 text-base backdrop-blur-md transition-all duration-700 ease-in-out ${
            darkMode
              ? "border-white/50 bg-black/40 text-white text-xs"
              : "border-black/50 bg-white/70 text-black text-xs shadow-md"
          }`}
        >
          Online Data Sharing Platform
        </div>
      </div>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <div
          className={`whitespace-nowrap rounded-xl border px-4 py-2 text-lg font-bold tracking-[0.3em] backdrop-blur-md transition-all duration-700 ease-in-out ${
            darkMode
              ? "border-white/50 bg-black/40 text-white"
              : "border-black/50 bg-white/70 text-black shadow-md"
          }`}
        >
          ＴΞNCHI
        </div>


        <nav className={`relative ml-auto flex w-fit items-center gap-2 rounded-3xl border p-2 shadow-lg backdrop-blur-md transition-all duration-700 ease-in-out ${
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

    
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${darkMode ? "opacity-100" : "opacity-0"}`}>
          <GalaxyBg />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${darkMode ? "opacity-0" : "opacity-100"}`}>
          <LightTheme />
        </div>
      </div>


    <div ref={sendRef} className="mt-34 flex justify-center gap-3 ">

      
       <div className="relative">
            <div className="mt-1 flex justify-center gap-3">
                <Text activeMode={activeMode} setActiveMode={setActiveMode} darkMode={darkMode} />
                <Filess activeMode={activeMode} setActiveMode={setActiveMode} files={files} setFiles={setFiles} darkMode={darkMode} />
                <Folder activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
                <Image activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
                <Video activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} darkMode={darkMode} />
            </div>

            <ActivePanel activeMode={activeMode} files={files} text={text} setText={setText} darkMode={darkMode} />
        </div>

    </div>
    <div ref={retrieveRef}>
      <Retrieval darkMode={darkMode} />
    </div>
    <ScrollButton darkMode={darkMode} sendRef={sendRef} retrieveRef={retrieveRef} />
    {historyOpen && (
      <History darkMode={darkMode} onClose={() => setHistoryOpen(false)} />
    )}
    </div>
  );
}
export default App;