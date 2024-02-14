import React from "react";
import { UndoButtonProps } from "../../types";

const UndoButton: React.FC<UndoButtonProps> = ({
  onClick,
  currentPlayer,
  player1MovesLeft,
  player2MovesLeft,
}) => {
  return (
    <div className="mt-4">
      <button
        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
        onClick={onClick}
        disabled={
          (currentPlayer === "player1" && player1MovesLeft === 0) ||
          (currentPlayer === "player2" && player2MovesLeft === 0)
        }
      >
        무르기
      </button>
    </div>
  );
};

export default UndoButton;
