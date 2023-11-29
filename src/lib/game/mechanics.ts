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
      Math.random() < 0.3 ? true : false
    )
  );
