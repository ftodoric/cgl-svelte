<script lang="ts">
  import { UPDATE_FREQ } from "$lib/game/config";
  import { getNextBoardMatrix } from "$lib/game/mechanics";
  import { getLastSave, saveCurrentConfig } from "$lib/game/memory";
  import type { BoardMatrix } from "$lib/game/types";
  import Board from "./Board/Board.svelte";

  // Game config
  let boardSize: number = 10;
  let speed: number = UPDATE_FREQ;
  let boardMatrix: BoardMatrix;
  $: boardMatrix = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => false)
  ); // Recreate board matrix after board size parameter changes

  // Get the last save
  const save = getLastSave();
  if (save) {
    boardSize = save.boardSize;
    speed = save.speed;
    boardMatrix = save.boardMatrix;
  }

  // Game structures
  let isGameRunning = false;
  let frId: number; // Frame Request ID

  // Game iteration
  const updateBoard = () => {
    if (!isGameRunning) return;

    boardMatrix = getNextBoardMatrix(boardMatrix);

    setTimeout(() => {
      frId = requestAnimationFrame(updateBoard);
    }, 1000 / speed); // Game Speed parameter formula
  };

  // Controls Handlers
  const handleBoardSizeChange = (e: any) => {
    boardSize = +e.target.value;
  };

  const handleSpeedChange = (e: any) => {
    speed = +e.target.value;
  };

  const handleResume = () => {
    // On Play save current config
    saveCurrentConfig({ boardSize, speed, boardMatrix });

    // Start the game
    isGameRunning = true;
    updateBoard();
  };

  const handlePause = () => {
    isGameRunning = false;
    cancelAnimationFrame(frId);
  };

  const handleReset = () => {
    // Reset the game
    handlePause();

    // Get last board matrix save
    const save = getLastSave();

    if (save) boardMatrix = save.boardMatrix;
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
    <input value={boardSize} type="number" on:change={handleBoardSizeChange} />
    <input value={speed} type="number" on:change={handleSpeedChange} />
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
