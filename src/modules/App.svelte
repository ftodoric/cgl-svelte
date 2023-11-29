<script lang="ts">
  import IconExpand from "$lib/components/Icons/IconExpand.svelte";
  import IconSpeed from "$lib/components/Icons/IconSpeed.svelte";
  import IconPlay from "$lib/components/Icons/IconPlay.svelte";
  import IconPause from "$lib/components/Icons/IconPause.svelte";
  import IconReset from "$lib/components/Icons/IconReset.svelte";
  import IconRandomize from "$lib/components/Icons/IconRandomize.svelte";
  import IconDelete from "$lib/components/Icons/IconDelete.svelte";
  import IconMenu from "$lib/components/Icons/IconMenu.svelte";

  import {
    getNextBoardMatrix,
    getRandomBoardMatrix,
  } from "$lib/game/mechanics";
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
  $: {
    if (!isGameRunning && !isPaused)
      saveCurrentConfig({ boardSize, speed, boardMatrix });
  }

  // Menu Drawer state
  let isDrawerOpen = false;

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

  const handleRandomize = (e: any) => {
    boardMatrix = getRandomBoardMatrix(boardSize);
  };

  const handleCleanBoard = () => {
    boardMatrix = boardMatrix.map((row) => row.map(() => false));
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

        <button class="control-button" on:click={handleReset}>
          <IconReset fill={colors.light.primary} />
        </button>

        <button
          class="control-button"
          on:click={handleRandomize}
          disabled={isGameRunning}
        >
          <IconRandomize
            fill={isGameRunning
              ? colors.light.primaryDimmed
              : colors.light.primary}
            w="24"
            h="24"
          />
        </button>

        <button
          class="control-button"
          on:click={handleCleanBoard}
          disabled={isGameRunning}
        >
          <IconDelete
            fill={isGameRunning
              ? colors.light.primaryDimmed
              : colors.light.primary}
            w="24"
            h="24"
          />
        </button>
      </div>
    </div>

    <Board bind:boardMatrix />
  </div>

  <button
    class="menu-button"
    class:button-shifted={isDrawerOpen}
    on:click={() => (isDrawerOpen = !isDrawerOpen)}
  >
    <IconMenu fill={colors.light.primary} w="30px" h="30px" />
  </button>

  <div class="drawer-menu" class:drawer-opened={isDrawerOpen}>
    Available patterns comming soon...
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
    font-size: 30px;

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

  .button-group > button + button {
    margin-left: 10px;
  }

  .control-button {
    transition: transform 0.2s;
    display: flex;
    align-items: center;
  }

  .control-button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }

  .control-button:disabled {
    transform: none;
    cursor: not-allowed;
  }

  .menu-button {
    position: fixed;
    top: 0;
    right: 0;

    margin: 10px;

    transition:
      transform 0.2s,
      right 0.2s;
  }

  .button-shifted {
    right: 300px;
    transform: rotate(180deg);
  }

  .menu-button:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  .button-shifted:hover {
    right: 300px;
    transform: rotate(180deg) scale(1.1);
  }

  .drawer-menu {
    position: fixed;
    top: 0;
    right: -300px;

    height: 100vh;
    width: 300px;

    transition: right 0.2s;

    box-shadow: -2px 0 10px #222;

    padding: 20px;
    color: var(--light-primary);
  }

  .drawer-opened {
    right: 0;
  }
</style>
