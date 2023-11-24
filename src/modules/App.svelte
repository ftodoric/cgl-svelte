<script lang="ts">
  import { glider } from "$lib/game/cgl-patterns";
  import { getNextBoardMatrix } from "$lib/game/mechanics";
  import type { BoardMatrix } from "$lib/game/types";
  import Board from "./Board/Board.svelte";

  // Game config
  let boardSize: number = 10;

  // Game structures
  let isGameRunning = false;
  let frId: number; // Frame Request ID
  let boardMatrix: BoardMatrix;
  $: boardMatrix = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => false)
  ); // Recreate board matrix after board size parameter changes

  // Game iteration
  const updateBoard = () => {
    if (!isGameRunning) return;

    boardMatrix = getNextBoardMatrix(boardMatrix);

    frId = requestAnimationFrame(updateBoard);
  };

  // Controls Handlers
  const handleBoardSizeChange = (e: any) => {
    boardSize = +e.target.value;
  };

  const handleResume = () => {
    isGameRunning = true;
    updateBoard();
  };

  const handlePause = () => {
    isGameRunning = false;
    cancelAnimationFrame(frId);
  };

  const handleReset = () => {
    handlePause();
    boardMatrix = glider; // TODO: Reset on the last position played
  };

  $: console.log(
    "%clog | description\n",
    "color: #0e8dbf; margin-bottom: 5px;",
    boardMatrix
  );
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
    <input value={boardSize} type="number" on:change={handleBoardSizeChange} />
    <button on:click={() => handleResume()}>Play</button>
    <button on:click={() => handlePause()}>Pause</button>
    <button on:click={() => handleReset()}>Reset</button>
  </div>

  <Board bind:boardMatrix />
</div>

<style>
  .controls {
    display: flex;
    justify-content: center;
  }
</style>
