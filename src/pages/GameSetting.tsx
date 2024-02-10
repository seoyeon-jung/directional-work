import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function GameSetting() {
  const navigate = useNavigate();

  const [boardSize, setBoardSize] = useState("3X3");
  const [winning, setWinning] = useState(3);
  const [player1Mark, setPlayer1Mark] = useState("X");
  const [player1MarkColor, setPlayer1MarkColor] = useState("blue");
  const [player2Mark, setPlayer2Mark] = useState("O");
  const [player2MarkColor, setPlayer2MarkColor] = useState("red");
  const [startingPlayer, setStartingPlayer] = useState("random");

  const handleStartGame = () => {
    const gameSettings = {
      boardSize,
      winning,
      player1Mark,
      player1MarkColor,
      player2Mark,
      player2MarkColor,
      startingPlayer,
    };

    axios
      .post("http://localhost:3001/settings", gameSettings)
      .then((response) => {
        console.log("게임 설정 정보가 성공적으로 저장되었습니다.");
        console.log(response);
        //navigate("/game"); // 게임 화면으로 이동
      })
      .catch((error) => {
        console.error(
          "게임 설정 정보를 저장하는 중 에러가 발생했습니다:",
          error
        );
      });
  };

  return (
    <div className="mx-auto mt-4 items-center w-full">
      <h2 className="text-2xl mb-4 text-center">게임 설정하기</h2>

      {/* 게임판 크기 설정 */}
      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-4">
          게임판 크기:
        </label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={(e) => setBoardSize(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={5}>6x6</option>
        </select>
      </div>

      {/* 승리 조건 설정 */}
      <div className="flex items-center mb-4">
        <label htmlFor="winning" className="mb-1 mr-7">
          승리 조건:
        </label>
        <select
          id="winning"
          value={winning}
          onChange={(e) => setWinning(parseInt(e.target.value))}
          className="w-full p-2 border rounded text-black"
        >
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
        </select>
      </div>

      {/* 플레이어의 마크, 마크의 색 설정 */}
      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-3">
          플레이어1 마크:
        </label>
        <select
          id="player1Mark"
          value={player1Mark}
          onChange={(e) => setPlayer1Mark(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="X">X</option>
          <option value="O">O</option>
          <option value="□">□</option>
          <option value="◇">◇</option>
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-4">
          플레이어1 마크 색상:
        </label>
        <select
          id="player1MarkColor"
          value={player1MarkColor}
          onChange={(e) => setPlayer1MarkColor(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="blue">blue</option>
          <option value="red">red</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-3">
          플레이어2 마크:
        </label>
        <select
          id="player2Mark"
          value={player2Mark}
          onChange={(e) => setPlayer2Mark(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="X">X</option>
          <option value="O">O</option>
          <option value="□">□</option>
          <option value="◇">◇</option>
        </select>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-4">
          플레이어2 마크 색상:
        </label>
        <select
          id="player2MarkColor"
          value={player2MarkColor}
          onChange={(e) => setPlayer2MarkColor(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="blue">blue</option>
          <option value="red">red</option>
          <option value="yellow">yellow</option>
          <option value="green">green</option>
        </select>
      </div>

      {/* 먼저 마크를 놓는 플레이어 설정 */}
      <div className="flex items-center mb-4">
        <label htmlFor="startingPlayer" className="mb-1 mr-5">
          시작 플레이어:
        </label>
        <select
          id="startingPlayer"
          value={startingPlayer}
          onChange={(e) => setStartingPlayer(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="random">랜덤</option>
          <option value="player1">플레이어 1</option>
          <option value="player2">플레이어 2</option>
        </select>
      </div>

      {/* 시작 버튼 */}
      <button
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
        onClick={handleStartGame}
      >
        게임 시작하기
      </button>
    </div>
  );
}
