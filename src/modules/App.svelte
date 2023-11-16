<script lang="ts">
  import { glider } from "../config/cgl-patterns";
  import GameBoard from "./Board.svelte";

  let isRunning = false;
  let rafId: number;
  let cells = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  const getNextCells = () =>
    cells.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        // Determine number of live neighbors
        let liveNeighbors = 0;
        for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
          for (let j = colIndex - 1; j <= colIndex + 1; j++) {
            // Current cell is not neighbor
            if (i === rowIndex && j === colIndex) continue;

            if (cells[i]?.[j]) liveNeighbors++;
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

  const handleResume = () => {
    isRunning = true;

    step();
  };

  const step = () => {
    cells = getNextCells();

    if (isRunning)
      setTimeout(() => {
        rafId = requestAnimationFrame(step);
      }, 500);
  };

  const handlePause = () => {
    isRunning = false;
    cancelAnimationFrame(rafId);
  };

  const handleReset = () => {
    handlePause();
    cells = glider;
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
  <div class="controls">
    <button on:click={() => handleResume()}>Play</button>
    <button on:click={() => handlePause()}>Pause</button>
    <button on:click={() => handleReset()}>Stop</button>
  </div>

  <GameBoard {cells} />
</div>

<style>
  .controls {
    display: flex;
    justify-content: center;
  }
</style>
