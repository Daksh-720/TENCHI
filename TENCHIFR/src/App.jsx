import { useRef, useState } from "react";
import "./App.css";
import HamBurgerMenu from "./components/HamBurgerMenu";
import GalaxyBg from './components/GalaxyBg';
import Theme from "./components/Theme";
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
  const [activeMode, setActiveMode] = useState("text");
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const sendRef = useRef(null);
  const retrieveRef = useRef(null);
  return (

    <div className={darkMode ? "relative min-h-screen overflow-hidden bg-black" : "relative min-h-screen overflow-hidden bg-[#F3EBDD]"}>
      <OAuth />
      <ProfileAvatar darkMode={darkMode} onHistory={() => setHistoryOpen(true)} />

    <div className="absolute top-6 right-6 z-50 flex items-center gap-2">

      <div className={darkMode
          ? "whitespace-nowrap rounded-full border border-white/50 bg-black/40 px-4 py-2 text-lg text-white backdrop-blur-md margin-right:100px"
          : "whitespace-nowrap rounded-full border border-black/50 bg-white/70 px-4 py-2 text-lg  text-black backdrop-blur-md shadow-md margin-right:100px"}>
          Online Data Sharing Platform
          </div>


        <div className={darkMode
          ? "whitespace-nowrap rounded-xl border border-white/50 bg-black/40 px-4 py-2 text-lg font-bold tracking-[0.3em] text-white backdrop-blur-md"
          : "whitespace-nowrap rounded-xl border border-black/50 bg-white/70 px-4 py-2 text-lg font-bold tracking-[0.3em] text-black backdrop-blur-md shadow-md"}>
          ＴΞNCHI
        </div>


        <nav className={darkMode ? "relative ml-auto flex w-fit items-center gap-2 rounded-3xl border border-white/10 bg-white/7 p-2 shadow-lg backdrop-blur-md" : "relative ml-auto flex w-fit items-center gap-2 rounded-3xl border border-black/10 bg-white/30 p-2 shadow-lg backdrop-blur-md"}>
        <HamBurgerMenu
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onHistory={() => setHistoryOpen(true)}
        />
        <Theme darkMode={darkMode} setDarkMode={setDarkMode} />
        </nav>
      </div>

    
      <div className="fixed inset-0 z-0 pointer-events-none">
        {darkMode ? <GalaxyBg /> : <LightTheme />}
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