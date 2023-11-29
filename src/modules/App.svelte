<script lang="ts">
  import "./styles.css";

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
      <div class="input-group" title="Board Size">
        <IconExpand fill={colors.light.primary} />
        <input
          class="control-input"
          value={boardSize}
          type="number"
          on:change={handleBoardSizeChange}
          disabled={isGameRunning}
        />
      </div>

      <div class="input-group" style="margin-left: 20px;" title="Game Speed">
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
          title={isGameRunning ? "Pause" : "Play"}
        >
          {#if isGameRunning}
            <IconPause fill={colors.light.primary} w="20" h="20" />
          {:else}
            <IconPlay fill={colors.light.primary} w="20" h="20" />
          {/if}
        </button>

        <button class="control-button" on:click={handleReset} title="Reset">
          <IconReset fill={colors.light.primary} />
        </button>

        <button
          class="control-button"
          on:click={handleRandomize}
          disabled={isGameRunning}
          title="Randomize"
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
          title="Clean the Board"
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
