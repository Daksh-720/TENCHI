import "./App.css";
import HamBurgerMenu from "./components/HamBurgerMenu";
import GalaxyBg from './components/GalaxyBg';
import Theme from "./components/Theme";
import UploadButtons from "./components/UploadButtons";

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
      
      <UploadButtons/>
    </div>
  );
}
export default App;