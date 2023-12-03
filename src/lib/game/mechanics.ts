import { getPatternMatrix, type SupportedPatterns } from "./cgl-patterns";
import type { BoardMatrix } from "./types";

export const getNextBoardMatrix = (boardMatrix: BoardMatrix) =>
  boardMatrix.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      // Determine number of live neighbors
      let liveNeighbors = 0;
      for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (let j = colIndex - 1; j <= colIndex + 1; j++) {
          // Current cell is not neighbor
          if (i === rowIndex && j === colIndex) continue;

          if (boardMatrix[i]?.[j]) liveNeighbors++;

          if (liveNeighbors === 4) break;
        }
        if (liveNeighbors === 4) break;
      }

      // If cell alive
      const liveAndWillLive =
        cell && (liveNeighbors === 2 || liveNeighbors === 3);
      const deadAndWillLive = !cell && liveNeighbors === 3;

      return liveAndWillLive || deadAndWillLive;
    });
  });

export const getRandomBoardMatrix = (boardSize: number) =>
  Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () =>
      Math.random() < 0.15 ? true : false
    )
  );

/**
 * Pattern will be generated inside the given dimensions. If the pattern is larger than the current board,
 * pattern will be clipped.
 *
 * @param boardSize
 * @param pattern
 * @returns
 */
export const getBoardMatrixWithPattern = (
  boardSize: number,
  pattern: SupportedPatterns
) => {
  let generatedBoardMatrix = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => false)
  );

  const patternMatrix = getPatternMatrix(pattern);
  const patternRows = patternMatrix.length;
  const patternCols = patternMatrix[0].length;

  // Determine from which row and column to draw
  let startingRowIndex = Math.max(
    Math.floor(boardSize / 2) - Math.floor(patternRows / 2) - 1,
    0
  );
  let startingColIndex = Math.max(
    Math.floor(boardSize / 2) - Math.floor(patternCols / 2) - 1,
    0
  );

  for (let i = 0; i < patternRows; i++) {
    for (let j = 0; j < patternCols; j++) {
      generatedBoardMatrix[startingRowIndex + i][startingRowIndex + j] =
        patternMatrix[i][j];
    }
  }

  return generatedBoardMatrix;
};

export const getIsBoardEmpty = (boardMatrix: BoardMatrix): boolean => {
  return boardMatrix.every((row) => row.every((cell) => !cell));
};
