<script lang="ts">
  import IconExpand from "$lib/components/Icons/IconExpand.svelte";
  import IconSpeed from "$lib/components/Icons/IconSpeed.svelte";
  import IconPlay from "$lib/components/Icons/IconPlay.svelte";
  import IconPause from "$lib/components/Icons/IconPause.svelte";
  import IconReset from "$lib/components/Icons/IconReset.svelte";
  import { getNextBoardMatrix } from "$lib/game/mechanics";
  import {
    getInitialBoardMatrix,
    getInitialBoardSize,
    getInitialSpeed,
    getLastSave,
    saveCurrentConfig,
  } from "$lib/game/memory";
  import type { BoardMatrix } from "$lib/game/types";
  import { colors } from "../styles/colors";
  import Board from "./Board/Board.svelte";

  // Game config
  let boardSize: number = getInitialBoardSize();
  let speed: number = getInitialSpeed();
  let boardMatrix: BoardMatrix = getInitialBoardMatrix();

  // Get the last save
  const save = getLastSave();
  if (save) {
    boardSize = save.boardSize;
    speed = save.speed;
    boardMatrix = save.boardMatrix;
  }

  // Game activity data
  let isGameRunning = false;
  let isPaused = false;
  let frId: number; // Frame Request ID

  // Game iteration
  const updateBoard = () => {
    if (!isGameRunning) return;

    boardMatrix = getNextBoardMatrix(boardMatrix);

    setTimeout(() => {
      frId = requestAnimationFrame(updateBoard);
    }, 1000 / speed); // Game Speed parameter formula
  };

  // Save Handler
  /*   $: {
    if (!isGameRunning && !isPaused)
      saveCurrentConfig({ boardSize, speed, boardMatrix });
  } */

  // Controls Handlers
  const handleBoardSizeChange = (e: any) => {
    boardSize = +e.target.value;
    boardMatrix = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => false)
    );
  };

  const handleSpeedChange = (e: any) => {
    speed = +e.target.value;
  };

  const handlePlay = () => {
    // Start the game
    isGameRunning = true;
    isPaused = false;

    updateBoard();
  };

  const handlePause = () => {
    isGameRunning = false;
    isPaused = true;
    cancelAnimationFrame(frId);
  };

  const handleReset = () => {
    // Reset the game
    handlePause();
    isPaused = false;

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

<div class="background-container">
  <div class="central-container">
    <h1 class="game-title">Conway's Game of Life</h1>

    <div class="controls">
      <!-- Game Config -->
      <div class="input-group">
        <IconExpand fill={colors.light.primary} />
        <input
          class="control-input"
          value={boardSize}
          type="number"
          on:change={handleBoardSizeChange}
          disabled={isGameRunning}
        />
      </div>

      <div class="input-group" style="margin-left: 20px;">
        <IconSpeed fill={colors.light.primary} />
        <input
          class="control-input"
          value={speed}
          type="number"
          on:change={handleSpeedChange}
          disabled={isGameRunning}
        />
      </div>

      <!-- Game Controls -->
      <div class="button-group">
        <button
          class="control-button"
          on:click={() => (isGameRunning ? handlePause() : handlePlay())}
        >
          {#if isGameRunning}
            <IconPause fill={colors.light.primary} w="20" h="20" />
          {:else}
            <IconPlay fill={colors.light.primary} w="20" h="20" />
          {/if}
        </button>

        <button
          class="control-button"
          style="margin-left: 10px;"
          on:click={() => handleReset()}
        >
          <IconReset fill={colors.light.primary} />
        </button>
      </div>
    </div>

    <Board bind:boardMatrix />
  </div>
</div>

<style>
  .background-container {
    min-height: 100vh;
    background-color: #333;
  }

  .central-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-title {
    margin-top: 20px;
    font-size: 24px;

    background: linear-gradient(90deg, #c6500e, #ffeec2);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .controls {
    display: flex;
    justify-content: center;

    margin-top: 50px;
  }

  .input-group {
    display: flex;
    align-items: center;
  }

  .control-input {
    background: none;
    padding: 0;
    border: none;
    outline: none;
    color: var(--light-primary);
    font-size: 16px;

    border-bottom: 2px solid var(--light-primary-dimmed);
    transition: border 0.2s;

    height: 20px;
    width: 50px;
    padding: 0 5px;

    margin-left: 5px;
  }

  input[type="number"]::-webkit-inner-spin-button {
    height: 15px;
  }

  .control-input:focus-visible,
  .control-input:hover {
    border-bottom: 2px solid var(--light-primary);
  }

  .control-input:disabled {
    border-color: transparent;
  }

  .button-group {
    margin-left: 50px;

    display: flex;
    align-items: center;
  }

  .control-button {
    padding: 0;
    border: none;
    background: none;
    transition: transform 0.2s;
    display: flex;
    align-items: center;
  }

  .control-button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
</style>
