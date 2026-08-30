import { useState } from "react";
import "./App.css";
import HamBurgerMenu from "./components/HamBurgerMenu";
import GalaxyBg from './components/GalaxyBg';
import Theme from "./components/Theme";
import Text from "./functions/Text";
import Folder from "./functions/Folder";
import Image from "./functions/Image";
import Video from "./functions/Video";
import Filess from "./functions/Filess";
import SendRet from "./functions/SendRet";
import ActivePanel from "./functions/ActivePanel";

function App(){
  const [activeMode, setActiveMode] = useState("text");
  const [files, setFiles] = useState([]);
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <GalaxyBg />


      <div className="absolute top-6 right-6 z-50">
        <nav className="ml-auto flex w-fit items-center gap-2 rounded-3xl border border-white/10 bg-white/7 p-2 shadow-lg backdrop-blur-md">
        <HamBurgerMenu />
        <Theme/>
        </nav>
      </div>


     <div className="mt-34 flex justify-center gap-3 ">

      
       <div className="relative">
            <div className="mt-1 flex justify-center gap-3">
                <Text activeMode={activeMode} setActiveMode={setActiveMode} />
                <Filess activeMode={activeMode} setActiveMode={setActiveMode} files={files} setFiles={setFiles} />
                <Folder activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} />
                <Image activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} />
                <Video activeMode={activeMode} setActiveMode={setActiveMode} setFiles={setFiles} />
            </div>

            <ActivePanel activeMode={activeMode} files={files} />
        </div>

    </div>
    </div>
  );
}
export default App;