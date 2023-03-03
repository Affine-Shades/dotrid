import { useSelector } from "react-redux";
import Canvas from "./components/canvas/Canvas";
import Menu from "./components/menu/Menu";
import StatsBar from "./components/statsBar/StatsBar";
import { RootState } from "./store/store";
import "@fontsource/ibm-plex-mono"

function App() {
  const showMenu = useSelector((state: RootState) => state.menu.show);

  return (
    <div className="App">
      {showMenu && <Menu />}
      <Canvas />
      <StatsBar />
    </div>
  );
}

export default App;
