export type Player = "X" | "O" | "□" | "◇";

export type BoardSize = 3 | 4 | 5 | 6;

export type Board = (Player | null)[][];

export interface PlayerInfo {
  mark: Player;
  color: string;
  remainMoveBefore: number;
}

export type StartingPlayerOption = "random" | "player1" | "player2";

export interface GameSettings {
  id: string;
  boardSize: number;
  winning: number;
  player1Mark: string;
  player1MarkColor: string;
  player2Mark: string;
  player2MarkColor: string;
  startingPlayer: string;
}

export interface GameMove {
  player: string | null;
  row: number;
  col: number;
  markOrder: number;
}

export interface GameRecordInfo {
  id: string;
  winner: string | null;
  moves: GameMove[];
  settings: GameSettings;
}

export interface ButtonProps {
  onClick?: () => void;
  to?: string;
  children?: React.ReactNode;
}

export interface CellProps {
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  mark: string | null;
  currentPlayer: string | null;
  player1Mark: string;
  player1MarkColor: string;
  player2Mark: string;
  player2MarkColor: string;
}

export interface PlayerInfoProps {
  currentPlayer: string | null;
  player1Mark: string;
  player1MarkColor: string;
  player2Mark: string;
  player2MarkColor: string;
  player1MovesLeft: number;
  player2MovesLeft: number;
}

export interface UndoButtonProps {
  onClick: () => void;
  currentPlayer: string | null;
  player1MovesLeft: number;
  player2MovesLeft: number;
}
