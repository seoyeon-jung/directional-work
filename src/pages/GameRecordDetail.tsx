import React, { useEffect, useState } from "react";
import { GameMove, GameRecordInfo } from "../types";
import axios from "axios";
import { useParams } from "react-router";

export default function GameRecordDetail() {
  const { id } = useParams<{ id: string }>();
  const [gameDetail, setGameDetail] = useState<GameRecordInfo | null>(null);

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/games/${id}`);
        setGameDetail(response.data);
      } catch (error) {
        console.error("게임 기록을 불러오는 중 오류가 발생했습니다: ", error);
      }
    };

    fetchGameDetail();
  }, [id]);

  if (!gameDetail) {
    return <div>loading...</div>;
  }

  const board: string[][] = Array.from(
    { length: gameDetail.settings.boardSize },
    () => Array.from({ length: gameDetail.settings.boardSize }, () => "")
  );

  gameDetail.moves.forEach((move: GameMove) => {
    const mark =
      move.player === "player1"
        ? gameDetail.settings.player1Mark
        : gameDetail.settings.player2Mark;
    board[move.row][move.col] = `${mark}: ${move.markOrder}`;
  });

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mb-4">게임 상세 정보</h1>

      {/* game board */}
      <div className="flex items-center justify-center">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="border border-gray-400  w-12 h-12 flex items-center justify-center"
                style={{
                  color: cell.includes(gameDetail.settings.player1Mark)
                    ? gameDetail.settings.player1MarkColor
                    : gameDetail.settings.player2MarkColor,
                }}
              >
                {cell || "-"}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        시작 플레이어 : {gameDetail.settings.startingPlayer}
      </div>

      <div className="flex mt-4">
        <div className="mr-8">
          <p className="text-2xl">Player 1</p>
          <p>마크: {gameDetail.settings.player1Mark}</p>
          <p>마크 색상: {gameDetail.settings.player1MarkColor}</p>
        </div>
        <div>
          <p className="text-2xl">Player 2</p>
          <p>마크: {gameDetail.settings.player2Mark}</p>
          <p>마크 색상: {gameDetail.settings.player2MarkColor}</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-2xl">게임 결과 : {gameDetail.winner || "무승부"}</p>
      </div>
    </div>
  );
}
