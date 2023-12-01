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
    getBoardMatrixWithPattern,
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
  import Board from "./Board/Board.svelte";
  import { SupportedPatterns, glider, lwss } from "$lib/game/cgl-patterns";
  import ControlBar from "./ControlBar/ControlBar.svelte";

  let count = 0;
  let show = false;

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

  $: {
    show = count === 3;
  }

  // Save Handler
  $: {
    if (!isGameRunning && !isPaused)
      saveCurrentConfig({ boardSize, speed, boardMatrix });
  }

  // Update board matrix on board size change
  $: {
    boardMatrix = boardMatrix = Array.from({ length: boardSize }, () =>
      Array.from({ length: boardSize }, () => false)
    );
  }

  // Menu Drawer state
  let isDrawerOpen = false;

  // Controls Handlers
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

  const handleRandomize = () => {
    boardMatrix = getRandomBoardMatrix(boardSize);
  };

  const handleCleanBoard = () => {
    boardMatrix = boardMatrix.map((row) => row.map(() => false));
  };

  const handleDrawPattern = (pattern: SupportedPatterns) => {
    boardMatrix = getBoardMatrixWithPattern(boardSize, pattern);
  };

  const handleClick = () => {
    if (count === 3) count = 0;
    else count += 1;
  };
</script>

<div class="background-container">
  <div class="central-container">
    <div class="game-header">
      <h1>Conway's Game of Life</h1>

      <button
        class="menu-button"
        class:button-shifted={isDrawerOpen}
        on:click={() => (isDrawerOpen = !isDrawerOpen)}
      >
        <IconMenu fill="var(--primary)" w="30px" h="30px" />
      </button>
    </div>

    <ControlBar
      {isGameRunning}
      bind:boardSize
      bind:speed
      {handlePlay}
      {handlePause}
      {handleReset}
      {handleRandomize}
      {handleCleanBoard}
    />

    <div class="board-layout">
      <Board bind:boardMatrix />
    </div>
  </div>

  <div class="drawer-menu" class:drawer-opened={isDrawerOpen}>
    <div class="content" class:content-opened={isDrawerOpen}>
      <div style="font-size: 22px; font-weight: bold;" class="title">
        Explore patterns
      </div>

      <div class="subtitle">Spaceships</div>

      <button
        class="pattern-button"
        on:click={(e) => {
          e.stopPropagation();
          handleDrawPattern(SupportedPatterns.Glider);
        }}
      >
        <div
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div style="color: #fff;">Glider</div>

          <Board boardMatrix={glider} readOnly />
        </div>
      </button>

      <button
        class="pattern-button"
        on:click={(e) => {
          e.stopPropagation();
          handleDrawPattern(SupportedPatterns.LWSS);
        }}
      >
        <div
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div style="color: #fff;">Light-weight Spaceship</div>

          <Board boardMatrix={lwss} readOnly />
        </div>
      </button>
    </div>
  </div>

  <button class="sikret" on:click={handleClick}>
    {#if show}
      X
    {/if}
  </button>

  <div
    style={`height: 200px; position: fixed; transition: bottom 0.2s; right: 40px; bottom: ${
      show ? 0 : -200
    }px;`}
  >
    <img
      src="capi.jpg"
      alt="simpleCapi"
      height="200px"
      style="display: block; border-radius: 5px 5px 0 0;"
    />
  </div>
</div>
