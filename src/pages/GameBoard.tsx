import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface GameSettings {
  id: string;
  boardSize: number;
  winning: number;
  player1Mark: string;
  player1MarkColor: string;
  player2Mark: string;
  player2MarkColor: string;
  startingPlayer: string;
}

export default function GameBoard() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [board, setBoard] = useState<(null | string)[][]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/settings")
      .then((response) => {
        setSettings(response.data[0] as GameSettings);
        initializeBoard(response.data[0].boardSize);
        //console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  // game board
  const initializeBoard = (boardSize: number) => {
    const newBoard: (null | string)[][] = [];
    for (let i = 0; i < boardSize; i++) {
      const row: (null | string)[] = [];
      for (let j = 0; j < boardSize; j++) {
        row.push(null);
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* 게임 보드 렌더링 */}
        <div className="grid grid-cols-3 gap-4">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="bg-gray-200 border border-gray-400 h-16 w-16 flex items-center justify-center"
              >
                {/* 각 셀에 대한 렌더링 로직 */}
              </div>
            ))
          )}
        </div>

        {/* 현재 플레이어 */}
        <div className="mt-4">
          {settings && <p>현재 플레이어: {settings?.startingPlayer}</p>}
        </div>

        {/* 플레이어 정보 표시 */}
        <div className="flex mt-4">
          <div className="mr-8">
            <p className="text-2xl">플레이어 1</p>
            {settings && (
              <>
                <p>마크: {settings.player1Mark}</p>
                <p>마크 색상: {settings.player1MarkColor}</p>
                <p>남은 무르기 횟수: </p>
              </>
            )}
          </div>
          <div>
            <p className="text-2xl">플레이어 2</p>
            {settings && (
              <>
                <p>마크: {settings.player2Mark}</p>
                <p>마크 색상: {settings.player2MarkColor}</p>
                <p>남은 무르기 횟수: </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 무르기 버튼 */}
      <div className="mt-4">
        <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto">
          무르기
        </button>
      </div>

      {/* game 종료 메세지 출력 */}
      <div className="mt-6 text-center">
        <p></p>
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
          onClick={() => navigate("/record")}
        >
          게임 기록 보러가기
        </button>
      </div>
    </div>
  );
}
