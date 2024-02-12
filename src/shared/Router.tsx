import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameBoard, GameRecord, GameSetting, Home } from "../pages";
import Header from "./Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GameBoard />} />
        <Route path="/setting" element={<GameSetting />} />
        <Route path="/record" element={<GameRecord />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
