import type { BoardMatrix } from "./types";

/**
 * Patterns are defined in a board of minimum dimensions.
 * When loaded into the game, they're centered.
 */

/**
 * Oscillators
 *
 * They are stable static patterns.
 */

export const blinker: BoardMatrix = [[true, true, true]];

export const toad: BoardMatrix = [
  [false, true, true, true],
  [true, true, true, false],
];

export const beacon: BoardMatrix = [
  [true, true, false, false],
  [true, false, false, false],
  [false, false, false, true],
  [false, false, true, true],
];

/**
 * Spaceships
 *
 * They represent stable moving patterns.
 */
export const glider: BoardMatrix = [
  [true, false, false],
  [false, true, true],
  [true, true, false],
];

// Light-weight Spaceship
export const lwss: BoardMatrix = [
  [false, true, false, false, true],
  [true, false, false, false, false],
  [true, false, false, false, true],
  [true, true, true, true, false],
];

// Middle-weight Spaceship
export const mwss: BoardMatrix = [
  [false, false, false, true, false, false],
  [false, true, false, false, false, true],
  [true, false, false, false, false, false],
  [true, false, false, false, false, true],
  [true, true, true, true, true, false],
];

// Heavy-weight Spaceship
export const hwss: BoardMatrix = [
  [false, false, false, true, true, false, false],
  [false, true, false, false, false, false, true],
  [true, false, false, false, false, false, false],
  [true, false, false, false, false, false, true],
  [true, true, true, true, true, true, false],
];
