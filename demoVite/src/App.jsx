import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import About from "./components/about";
import Play from "./components/play";
import Scores from "./components/scores";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/play" element={<Play />} />
        <Route path="/scores" element={<Scores />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;