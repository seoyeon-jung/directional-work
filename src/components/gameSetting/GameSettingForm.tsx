import React from "react";

interface GameSettingsFormProps {
  boardSize: string;
  winning: number;
  player1Mark: string;
  player1MarkColor: string;
  player2Mark: string;
  player2MarkColor: string;
  startingPlayer: string;
  onBoardSizeChange: (size: string) => void;
  onWinningChange: (value: number) => void;
  onPlayer1MarkChange: (mark: string) => void;
  onPlayer1MarkColorChange: (color: string) => void;
  onPlayer2MarkChange: (mark: string) => void;
  onPlayer2MarkColorChange: (color: string) => void;
  onStartingPlayerChange: (player: string) => void;
}

const GameSettingsForm: React.FC<GameSettingsFormProps> = ({
  boardSize,
  winning,
  player1Mark,
  player1MarkColor,
  player2Mark,
  player2MarkColor,
  startingPlayer,
  onBoardSizeChange,
  onWinningChange,
  onPlayer1MarkChange,
  onPlayer1MarkColorChange,
  onPlayer2MarkChange,
  onPlayer2MarkColorChange,
  onStartingPlayerChange,
}) => {
  return (
    <div>
      {/* 게임판 크기 설정 */}
      <div className="flex items-center mb-4">
        <label htmlFor="boardSize" className="mb-1 mr-4">
          게임판 크기:
        </label>
        <select
          id="boardSize"
          value={boardSize}
          onChange={(e) => onBoardSizeChange(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
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
          onChange={(e) => onWinningChange(parseInt(e.target.value))}
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
          player1 마크:
        </label>
        <select
          id="player1Mark"
          value={player1Mark}
          onChange={(e) => onPlayer1MarkChange(e.target.value)}
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
          player1 마크 색상:
        </label>
        <select
          id="player1MarkColor"
          value={player1MarkColor}
          onChange={(e) => onPlayer1MarkColorChange(e.target.value)}
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
          player2 마크:
        </label>
        <select
          id="player2Mark"
          value={player2Mark}
          onChange={(e) => onPlayer2MarkChange(e.target.value)}
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
          player2 마크 색상:
        </label>
        <select
          id="player2MarkColor"
          value={player2MarkColor}
          onChange={(e) => onPlayer2MarkColorChange(e.target.value)}
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
          onChange={(e) => onStartingPlayerChange(e.target.value)}
          className="w-full p-2 border rounded text-black"
        >
          <option value="random">random</option>
          <option value="player1">player 1</option>
          <option value="player2">player 2</option>
        </select>
      </div>
    </div>
  );
};

export default GameSettingsForm;
