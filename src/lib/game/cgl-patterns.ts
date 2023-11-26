import type { BoardMatrix } from "./types";

/**
 * Patterns are defined in a board of minimum dimensions.
 * When loaded into the game, they're centered.
 */

export const glider: BoardMatrix = [
  [true, false, false],
  [false, true, true],
  [true, true, false],
];

export const lwss: BoardMatrix = [
  [false, true, false, false, true],
  [true, false, false, false, false],
  [true, false, false, false, true],
  [true, true, true, true, false],
];
