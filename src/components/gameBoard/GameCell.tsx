import React from "react";
import { CellProps } from "../../types";

const GameCell: React.FC<CellProps> = ({
  row,
  col,
  onClick,
  mark,
  currentPlayer,
  player1Mark,
  player1MarkColor,
  player2Mark,
  player2MarkColor,
}) => {
  return (
    <div
      className="border border-gray-400 w-16 h-16 flex items-center justify-center"
      onClick={() => onClick(row, col)}
      style={{
        color:
          mark === player1Mark
            ? player1MarkColor
            : mark === player2Mark
            ? player2MarkColor
            : undefined,
      }}
    >
      {mark}
    </div>
  );
};

export default GameCell;
