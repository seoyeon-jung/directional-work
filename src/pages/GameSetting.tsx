import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import StartButton from "../components/gameSetting/StartButton";
import GameSettingsForm from "../components/gameSetting/GameSettingForm";

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
    const gameId = uuidv4();

    const gameSettings = {
      id: gameId,
      boardSize: parseInt(boardSize),
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
        const gameId = response.data.id;
        navigate(`/game/${gameId}`); // 게임 화면으로 이동
      })
      .catch((error) => {
        console.error(
          "게임 설정 정보를 저장하는 중 에러가 발생했습니다:",
          error
        );
      });
  };

  return (
    <div className="mx-auto mt-4 items-center w-full flex flex-col">
      <h2 className="text-2xl mb-4 text-center">게임 설정하기</h2>

      {/* 게임 설정 입력 폼 */}
      <GameSettingsForm
        boardSize={boardSize}
        winning={winning}
        player1Mark={player1Mark}
        player1MarkColor={player1MarkColor}
        player2Mark={player2Mark}
        player2MarkColor={player2MarkColor}
        startingPlayer={startingPlayer}
        onBoardSizeChange={setBoardSize}
        onWinningChange={setWinning}
        onPlayer1MarkChange={setPlayer1Mark}
        onPlayer1MarkColorChange={setPlayer1MarkColor}
        onPlayer2MarkChange={setPlayer2Mark}
        onPlayer2MarkColorChange={setPlayer2MarkColor}
        onStartingPlayerChange={setStartingPlayer}
      />

      {/* 시작 버튼 */}
      <div className="mx-auto mt-3">
        <StartButton onClick={handleStartGame} />
      </div>
    </div>
  );
}
