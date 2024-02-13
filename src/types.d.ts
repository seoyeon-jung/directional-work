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
