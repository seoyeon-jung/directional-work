import axios from "axios";
import React, { useEffect, useState } from "react";
import { GameRecordInfo, GameMove } from "../types";
import Button from "../components/shared/Button";

export default function GameRecord() {
  const [gameRecords, setGameRecords] = useState<GameRecordInfo[]>([]);
  const [visibleRecords, setVisibleRecords] = useState<GameRecordInfo[]>([]);
  const [showMore, setShowMore] = useState(false);

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

  useEffect(() => {
    setVisibleRecords(gameRecords.slice(0, 6));
  }, [gameRecords]);

  const handleShowMore = () => {
    setVisibleRecords(gameRecords);
    setShowMore(true);
  };

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
          <Button to={`/record/${gameRecord.id}`}>자세히 보러가기</Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-4">
        게임 기록 전체보기
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleRecords.map(renderGameRecord)}
      </div>
      {!showMore && gameRecords.length > 6 && (
        <div className="text-center mt-4">
          <Button onClick={handleShowMore}>더보기</Button>
        </div>
      )}
    </div>
  );
}
