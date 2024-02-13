import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameRecordInfo, GameMove } from "../types";
import { useNavigate } from "react-router";

export default function GameRecord() {
  const [gameRecords, setGameRecords] = useState<GameRecordInfo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/games")
      .then((response) => {
        setGameRecords(response.data);
      })
      .catch((error) => {
        console.error("게임 기록을 불러오는 중 오류가 발생했습니다: ", error);
      });
  }, []);

  const renderGameRecord = (gameRecord: GameRecordInfo) => {
    const { settings, moves } = gameRecord;
    const { boardSize } = settings;
    const board: string[][] = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => "")
    );

    moves.forEach((move: GameMove) => {
      const mark =
        move.player === "player1" ? settings.player1Mark : settings.player2Mark;
      board[move.row][move.col] = `${mark}: ${move.markOrder}`;
    });

    const renderBoard = board.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className="border border-gray-400  w-12 h-12 flex items-center justify-center"
            style={{
              color: cell.includes(settings.player1Mark)
                ? settings.player1MarkColor
                : settings.player2MarkColor,
            }}
          >
            {cell || "-"}
          </div>
        ))}
      </div>
    ));

    return (
      <div
        key={gameRecord.id}
        className="max-w-sm border border-gray-200 rounded-lg shadow mb-8 text-center"
      >
        <div className="rounded-t-lg w-80 h-80 flex justify-center items-center">
          <div>{renderBoard}</div>
        </div>
        <hr className="border-t border-gray-200 mt-3" />
        <div className="p-5 bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            게임 결과: {gameRecord.winner || "무승부"}
          </h5>
          <button
            className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 mb-4 rounded transition duration-300 mt-4 block mx-auto"
            onClick={() => navigate(`/record/${gameRecord.id}`)}
          >
            자세히 보러가기
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-4">
        게임 기록 전체보기
      </h1>
      {gameRecords.map(renderGameRecord)}
    </div>
  );
}
