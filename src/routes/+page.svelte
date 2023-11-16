<script lang="ts">
  import "../styles/reset.css";
  import "../styles/globals.css";
  import Cell from "../components/Cell.svelte";
  import { UPDATE_FREQ } from "../config/game";
  import { glider } from "../config/cgl-patterns";
  import type { BoardState } from "../config/types";

  const initialBoardState: BoardState = {
    width: 10,
    height: 10,
    aliveCellIndices: glider,
  };

  let boardState = initialBoardState;

  let activeGameLoopId: number;

  const isCellAlive = (rowIndex: number, colIndex: number) => {
    if (rowIndex < 0 || rowIndex > boardState.height - 1) return false;
    if (colIndex < 0 || colIndex > boardState.width - 1) return false;

    return boardState.aliveCellIndices.some((cell) => {
      return cell[0] === rowIndex && cell[1] === colIndex;
    });
  };

  const calculateNextBoardState = (boardState: BoardState) => {
    let nextAliveCellIndices: [number, number][] = [];

    Array(boardState.height)
      .fill(0)
      .forEach((_, rowIndex) => {
        Array(boardState.width)
          .fill(0)
          .forEach((_, colIndex) => {
            // Determine number of live neighbors
            let liveNeighbors = 0;

            for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
              for (let j = colIndex - 1; j <= colIndex + 1; j++) {
                // Current cell is not neighbor
                if (i === rowIndex && j === colIndex) continue;

                if (isCellAlive(i, j)) liveNeighbors++;
              }
            }

            // If cell alive
            if (isCellAlive(rowIndex, colIndex)) {
              if (liveNeighbors === 2 || liveNeighbors === 3) {
                nextAliveCellIndices.push([rowIndex, colIndex]);
              }
            }
            // If cell dead
            else {
              if (liveNeighbors === 3) {
                nextAliveCellIndices.push([rowIndex, colIndex]);
              }
            }
          });
      });

    return { ...boardState, aliveCellIndices: nextAliveCellIndices };
  };

  const handleResume = () => {
    activeGameLoopId = setInterval(() => {
      boardState = calculateNextBoardState(boardState);
    }, (1 / UPDATE_FREQ) * 1000);
  };

  const handlePause = () => {
    clearInterval(activeGameLoopId);
  };

  const handleStop = () => {
    handlePause();
    // reset game board to initial one
    boardState = initialBoardState;
  };
</script>

<svelte:head>
  <title>Conway's Game of Life</title>
  <meta
    name="description"
    content="Create your own pattern in Conway's Game of Life!"
  />
</svelte:head>

<div>
  <button on:click={() => handleResume()}>Play</button>
  <button on:click={() => handlePause()}>Pause</button>
  <button on:click={() => handleStop()}>Stop</button>

  <div class="game-board">
    {#key boardState}
      {#each Array(boardState.height).fill(0) as _, rowIndex}
        <div class="board-row">
          {#each Array(boardState.width).fill(0) as _, colIndex}
            <Cell isAlive={isCellAlive(rowIndex, colIndex)} />
          {/each}
        </div>
      {/each}
    {/key}
  </div>
</div>

<style>
  .game-board {
    display: flex;
    flex-direction: column;
  }

  .board-row {
    display: flex;
  }
</style>
