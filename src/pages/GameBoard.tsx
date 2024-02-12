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

interface GameMove {
  player: string | null;
  row: number;
  col: number;
  markOrder: number;
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
  const [gameMoves, setGameMoves] = useState<GameMove[]>([]); // game 저장

  useEffect(() => {
    axios
      .get(`http://localhost:3001/settings/${id}`)
      .then((response) => {
        setSettings(response.data as GameSettings);
        initializeBoard(response.data.boardSize);
        setCurrentPlayer(response.data.startingPlayer);
        saveGameRecord(null, id); // 게임 ID를 전달하여 저장
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [id]);

  // 게임 보드 초기화
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

  // 셀 클릭 이벤트
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (!board[rowIndex][colIndex] && !winningMessage && currentPlayer) {
      const newBoard = [...board];
      newBoard[rowIndex][colIndex] =
        currentPlayer === "플레이어1"
          ? settings!.player1Mark
          : settings!.player2Mark;
      setBoard(newBoard);
      setLastClickedCell({ row: rowIndex, col: colIndex });
      saveGameMove(currentPlayer, rowIndex, colIndex); // 클릭된 셀 정보 저장
      checkWinner(newBoard, rowIndex, colIndex);
      setCurrentPlayer(
        currentPlayer === "플레이어1" ? "플레이어2" : "플레이어1"
      );
    }
  };

  // 승리자 확인
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
        setWinningMessage(`${currentPlayer} wins!`);
        saveGameRecord(currentPlayer, id); // 게임 ID를 전달하여 저장
        return;
      }
    }

    if (isBoardFull() && !checkDraw()) {
      setWinningMessage("무승부!");
      saveGameRecord("무승부", id); // 게임 ID를 전달하여 저장
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

  // 보드가 가득 찼는지 확인
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

  // 무승부 확인
  const checkDraw = () => {
    const { winning } = settings!;
    const rows = board.length;
    const cols = board[0].length;

    // 가로 확인
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

    // 세로 확인
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

    // 대각선 확인 (왼쪽 위에서 오른쪽 아래로)
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

    // 대각선 확인 (오른쪽 위에서 왼쪽 아래로)
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

  // 게임 이동 저장
  const saveGameMove = (player: string, row: number, col: number) => {
    const markOrder =
      gameMoves.filter((move) => move.player === player).length + 1; // 해당 플레이어의 마크 순서 계산
    const newMove: GameMove = { player, row, col, markOrder };
    setGameMoves([...gameMoves, newMove]); // 이전 상태와 새로운 이동 추가
  };

  // 게임 기록 저장
  const saveGameRecord = (
    winner: string | null,
    gameId: string | undefined
  ) => {
    if (gameId) {
      // gameId가 존재하는 경우에만 실행
      const gameRecord = {
        id: gameId, // 게임 ID 추가
        winner,
        moves: gameMoves,
      };

      axios
        .post("http://localhost:3001/games", gameRecord)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("게임 기록 저장 중 오류가 발생했습니다:", error);
        });
    }
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

      {/* 게임 종료 메시지 출력 */}
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
