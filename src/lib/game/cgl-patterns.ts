import type { BoardMatrix } from "./types";

export const glider: BoardMatrix = [
  [false, false, false, false, false, false, false],
  [false, true, false, false, false, false, false],
  [false, false, true, true, false, false, false],
  [false, true, true, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
];

export const lwss: BoardMatrix = [
  [false, true, false, false, true],
  [true, false, false, false, false],
  [true, false, false, false, true],
  [true, true, true, true, false],
];
