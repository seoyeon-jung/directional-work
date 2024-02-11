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
  boardSize: BoardSize;
  winning: number;
  player1Mark: Player;
  player1MarkColor: string;
  player2Mark: Player;
  player2MarkColor: string;
  startingPlayer: StartingPlayerOption;
}
