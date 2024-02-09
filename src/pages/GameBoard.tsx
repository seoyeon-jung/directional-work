import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Player = "X" | "O";
type Board = (Player | null)[];

interface PlayerInfo {
  mark: Player;
  color: string;
  remainMoveBefore: number;
}

const initialBoardState: Board = Array(9).fill(null); // 초기 board
const initialPlayerInfos: { [key in Player]: PlayerInfo } = {
  X: { mark: "X", color: "blue", remainMoveBefore: 3 },
  O: { mark: "O", color: "red", remainMoveBefore: 3 },
};

export default function GameBoard() {
  const [boardHistory, setBoardHistory] = useState<Board[]>([
    initialBoardState,
  ]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [playerInfos, setPlayerInfos] =
    useState<{ [key in Player]: PlayerInfo }>(initialPlayerInfos);
  const [winner, setWinner] = useState<Player | "무승부" | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    checkWinner(boardHistory[currentStep], currentPlayer);
  }, [boardHistory, currentPlayer, currentStep]);

  // game board 초기화
  // const resetBoard = (): void => {
  //   setBoard(initialBoardState);
  //   setCurrentPlayer("X");
  //   setPlayerInfos(initialPlayerInfos);
  //   setWinner(null);
  // };

  // player가 마크 클릭할 때
  const handleClick = (index: number): void => {
    if (boardHistory[currentStep][index] === null && !winner) {
      const newBoard = [...boardHistory[currentStep]];
      newBoard[index] = currentPlayer;
      const newHistory = boardHistory.slice(0, currentStep + 1);
      setBoardHistory([...newHistory, newBoard]);
      setCurrentStep(currentStep + 1);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const moveBefore = (): void => {
    if (
      !winner &&
      playerInfos[currentPlayer].remainMoveBefore > 0 &&
      currentStep > 0
    ) {
      const player = currentPlayer;
      setCurrentStep((prevStep) => prevStep - 1);
      setPlayerInfos((prevPlayerInfos) => ({
        ...prevPlayerInfos,
        [player]: {
          ...prevPlayerInfos[player],
          remainMoveBefore: prevPlayerInfos[player].remainMoveBefore - 1,
        },
      }));
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    } else if (!winner && playerInfos[currentPlayer].remainMoveBefore === 0) {
      alert("무르기 횟수를 모두 사용하셨습니다.");
    }
  };

  const checkWinner = (board: Board, player: Player): void => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(player);
        break;
      }
    }

    if (
      Object.values(playerInfos).every((info) => info.remainMoveBefore === 0)
    ) {
      setWinner("무승부");
    }
  };

  // game over
  const gameOverMessage = (): string => {
    if (winner === "무승부") {
      return "게임 종료: 무승부입니다.";
    } else if (winner) {
      return `게임 종료: ${winner}가 이겼습니다`;
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* 게임 보드 렌더링 */}
        <div className="grid grid-cols-3 gap-4">
          {boardHistory[currentStep].map((cell, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`w-16 h-16 border border-white flex items-center justify-center text-3xl cursor-pointer ${
                cell ? playerInfos[cell].color : ""
              }`}
            >
              {cell}
            </div>
          ))}
        </div>

        {/* 현재 플레이어 */}
        <div className="mt-4">현재 플레이어 : {currentPlayer}</div>

        {/* 플레이어 정보 표시 */}
        <div className="flex mt-4">
          <div className="mr-8">
            <p className="text-2xl">플레이어 1</p>
            <p>마크: {playerInfos["X"].mark}</p>
            <p>마크 색상: {playerInfos["X"].color}</p>
            <p>남은 무르기 횟수: {playerInfos["X"].remainMoveBefore}</p>
          </div>
          <div>
            <p className="text-2xl">플레이어 2</p>
            <p>마크: {playerInfos["X"].mark}</p>
            <p>마크 색상: {playerInfos["X"].color}</p>
            <p>남은 무르기 횟수: {playerInfos["X"].remainMoveBefore}</p>
          </div>
        </div>
      </div>

      {/* 무르기 버튼 */}
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
          onClick={moveBefore}
        >
          무르기
        </button>
      </div>

      {/* game 종료 메세지 출력 */}
      <div className="mt-6 text-center">
        <p>{gameOverMessage()}</p>
        {/* <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
          onClick={resetBoard}
        >
          다시 시작하기
        </button> */}
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
