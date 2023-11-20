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
        }
      }

      // If cell alive
      if (cell) {
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          return 1;
        }
      }
      // If cell dead
      else {
        if (liveNeighbors === 3) {
          return 1;
        }
      }

      return 0;
    });
  });
