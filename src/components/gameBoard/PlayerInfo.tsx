import React from "react";
import { PlayerInfoProps } from "../../types";

const PlayerInfo: React.FC<PlayerInfoProps> = ({
  currentPlayer,
  player1Mark,
  player1MarkColor,
  player2Mark,
  player2MarkColor,
  player1MovesLeft,
  player2MovesLeft,
}) => {
  return (
    <div className="flex mt-4">
      <div className="mr-8">
        <p className="text-2xl">Player 1</p>
        <p>마크: {player1Mark}</p>
        <p>마크 색상: {player1MarkColor}</p>
        <p>남은 무르기 횟수: {player1MovesLeft}</p>
      </div>
      <div>
        <p className="text-2xl">Player 2</p>
        <p>마크: {player2Mark}</p>
        <p>마크 색상: {player2MarkColor}</p>
        <p>남은 무르기 횟수: {player2MovesLeft}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
