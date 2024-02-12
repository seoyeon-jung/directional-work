import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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
  const { id } = useParams();
  const [settings, setSettings] = useState<GameSettings | null>(null);
  const [board, setBoard] = useState<(null | string)[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<string | null>(null);
  const [player1MovesLeft, setPlayer1MovesLeft] = useState<number>(3);
  const [player2MovesLeft, setPlayer2MovesLeft] = useState<number>(3);
  const [lastClickedCell, setLastClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [winningMessage, setWinningMessage] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/settings/${id}`)
      .then((response) => {
        setSettings(response.data as GameSettings);
        initializeBoard(response.data.boardSize);
        setCurrentPlayer(response.data.startingPlayer);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [id]);

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

  // cell click
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!board[rowIndex][colIndex] && !winningMessage) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] =
        currentPlayer === "플레이어1"
          ? settings!.player1Mark
          : settings!.player2Mark;
      setBoard(newBoard);
      setLastClickedCell({ row: rowIndex, col: colIndex });
      checkWinner(newBoard, rowIndex, colIndex);
      setCurrentPlayer(
        currentPlayer === "플레이어1" ? "플레이어2" : "플레이어1"
      );
    }
  };

  const checkWinner = (
    currentBoard: (null | string)[][],
    rowIndex: number,
    colIndex: number
  ) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, 1],
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      let x = rowIndex + dx;
      let y = colIndex + dy;
      while (
        x >= 0 &&
        x < currentBoard.length &&
        y >= 0 &&
        y < currentBoard[x].length &&
        currentBoard[x][y] === currentBoard[rowIndex][colIndex]
      ) {
        count++;
        x += dx;
        y += dy;
      }

      x = rowIndex - dx;
      y = colIndex - dy;
      while (
        x >= 0 &&
        x < currentBoard.length &&
        y >= 0 &&
        y < currentBoard[x].length &&
        currentBoard[x][y] === currentBoard[rowIndex][colIndex]
      ) {
        count++;
        x -= dx;
        y -= dy;
      }

      if (count >= settings!.winning) {
        // Game won
        setWinningMessage(`${currentPlayer} wins!`);
        // Save game record
        saveGameRecord(currentPlayer);
        return;
      }
    }

    if (isBoardFull() && !checkDraw()) {
      // Draw
      setWinningMessage("무승부!");
      saveGameRecord("무승부");
    }
  };

  // 무르기
  const handleUndo = () => {
    const currentPlayerMovesLeft =
      currentPlayer === "플레이어1" ? player1MovesLeft : player2MovesLeft;

    if (currentPlayerMovesLeft > 0 && lastClickedCell && !winningMessage) {
      const { row, col } = lastClickedCell;
      const newBoard = [...board];
      newBoard[row][col] = null;
      setBoard(newBoard);

      if (currentPlayer === "플레이어1") {
        setPlayer1MovesLeft(player1MovesLeft - 1);
      } else {
        setPlayer2MovesLeft(player2MovesLeft - 1);
      }
      alert("무르기를 사용했습니다");
    } else {
      alert("남은 무르기 횟수가 없습니다.");
    }
  };

  const saveGameRecord = (winner: string | null) => {
    console.log(`winner: ${winner}`);
  };

  const isBoardFull = () => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (!board[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  const checkDraw = () => {
    const { winning } = settings!;
    const rows = board.length;
    const cols = board[0].length;

    // 가로 계산
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols - winning; j++) {
        let count = 1;
        const mark = board[i][j];
        if (!mark) continue;
        for (let k = 1; k < winning; k++) {
          if (board[i][j + k] === mark) count++;
          else break;
        }
        if (count === winning) return true;
      }
    }

    // 세로 계산
    for (let i = 0; i <= rows - winning; i++) {
      for (let j = 0; j < cols; j++) {
        let count = 1;
        const mark = board[i][j];
        if (!mark) continue;
        for (let k = 1; k < winning; k++) {
          if (board[i + k][j] === mark) count++;
          else break;
        }
        if (count === winning) return true;
      }
    }

    // 왼쪽 위에서부터 오른쪽 끝까지 대각선 계산
    for (let i = 0; i <= rows - winning; i++) {
      for (let j = 0; j <= cols - winning; j++) {
        let count = 1;
        const mark = board[i][j];
        if (!mark) continue;
        for (let k = 1; k < winning; k++) {
          if (board[i + k][j + k] === mark) count++;
          else break;
        }
        if (count === winning) return true;
      }
    }

    // 오른쪽 위부터 왼쪽 끝까지 계산
    for (let i = 0; i <= rows - winning; i++) {
      for (let j = winning - 1; j < cols; j++) {
        let count = 1;
        const mark = board[i][j];
        if (!mark) continue;
        for (let k = 1; k < winning; k++) {
          if (board[i + k][j - k] === mark) count++;
          else break;
        }
        if (count === winning) return true;
      }
    }

    return false;
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {/* 게임 보드 렌더링 */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="border border-gray-400  w-16 h-16 flex items-center justify-center"
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  color:
                    cell === settings?.player1Mark
                      ? settings?.player1MarkColor
                      : cell === settings?.player2Mark
                      ? settings?.player2MarkColor
                      : undefined,
                }}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}

        {/* 현재 플레이어 */}
        <div className="mt-4">
          {settings && <p>현재 플레이어: {currentPlayer}</p>}
        </div>

        {/* 플레이어 정보 표시 */}
        <div className="flex mt-4">
          <div className="mr-8">
            <p className="text-2xl">플레이어 1</p>
            {settings && (
              <>
                <p>마크: {settings.player1Mark}</p>
                <p>마크 색상: {settings.player1MarkColor}</p>
                <p>남은 무르기 횟수: {player1MovesLeft}</p>
              </>
            )}
          </div>
          <div>
            <p className="text-2xl">플레이어 2</p>
            {settings && (
              <>
                <p>마크: {settings.player2Mark}</p>
                <p>마크 색상: {settings.player2MarkColor}</p>
                <p>남은 무르기 횟수: {player2MovesLeft}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 무르기 버튼 */}
      <div className="mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
          onClick={handleUndo}
          disabled={
            (currentPlayer === "플레이어1" && player1MovesLeft === 0) ||
            (currentPlayer === "플레이어2" && player2MovesLeft === 0)
          }
        >
          무르기
        </button>
      </div>

      {/* game 종료 메세지 출력 */}
      <div className="mt-6 text-center">
        <p>{winningMessage}</p>
        <button
          className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded transition duration-300 mt-6 block mx-auto"
          onClick={() => navigate("/record")}
          disabled={!winningMessage}
        >
          게임 기록 보러가기
        </button>
      </div>
    </div>
  );
}
