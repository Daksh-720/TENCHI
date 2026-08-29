import "./App.css";
import HamBurgerMenu from "./components/HamBurgerMenu";
import GalaxyBg from './components/GalaxyBg';
import Theme from "./components/Theme";
import UploadButtons from "./components/UploadButtons";
import Text from "./functions/Text";
import Folder from "./functions/Folder";
import Image from "./functions/Image";
import Video from "./functions/Video";
import Filess from "./functions/Filess";
function App(){
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <GalaxyBg />


      <div className="absolute top-6 right-6 z-50">
        <nav className="ml-auto flex w-fit items-center gap-2 rounded-3xl border border-white/10 bg-white/7 p-2 shadow-lg backdrop-blur-md">
        <HamBurgerMenu />
        <Theme/>
        </nav>
      </div>


     <div className="mt-38 flex justify-center gap-3 ">
      <Text />
      <Filess />
      <Folder />
      <Image />
      <Video />
     </div>


    </div>
  );
}
export default App;