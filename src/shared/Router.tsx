import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameBoard, GameRecord, GameSetting, Home } from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<GameBoard />} />
        <Route path="/setting" element={<GameSetting />} />
        <Route path="/record" element={<GameRecord />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
