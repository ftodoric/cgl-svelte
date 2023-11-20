<script lang="ts">
  import { glider } from "$lib/game/cgl-patterns";
  import { getNextBoard } from "$lib/game/mechanics";
  import type { BoardMatrix } from "$lib/game/types";
  import Board from "./Board/Board.svelte";

  // Game structures
  let isGameRunning = false;
  let frId: number; // Frame Request ID
  let boardMatrix: BoardMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const step = () => {
    boardMatrix = getNextBoard(boardMatrix);

    if (isGameRunning)
      setTimeout(() => {
        frId = requestAnimationFrame(step);
      }, 500);
  };

  const handleResume = () => {
    isGameRunning = true;

    step();
  };

  const handlePause = () => {
    isGameRunning = false;
    cancelAnimationFrame(frId);
  };

  const handleReset = () => {
    handlePause();
    boardMatrix = glider;
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

  <Board {boardMatrix} />
</div>

<style>
  .controls {
    display: flex;
    justify-content: center;
  }
</style>
