<script lang="ts">
  import "./styles.css";

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
  import ControlBar from "./ControlBar/ControlBar.svelte";
  import DrawerMenu from "./DrawerMenu/DrawerMenu.svelte";
  import type { SupportedPatterns } from "$lib/game/cgl-patterns";

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

  const letterSet = "AxKhjkDfiwr".split("");
  const originalString = "Conway's Game of Life";
  const targetSet = originalString.split("");
  let letterCount = Array(originalString.length).fill(0);
  const animateChar = (targetIndex: number) => {
    if (
      letterCount[targetIndex] === 1 ||
      targetSet[targetIndex] === "'" ||
      targetSet[targetIndex] === " "
    ) {
      targetSet[targetIndex] = originalString[targetIndex];
      return;
    }
    targetSet[targetIndex] = letterSet[Math.floor(Math.random() * 10)];
    setTimeout(() => requestAnimationFrame(() => animateChar(targetIndex)), 50);
  };

  // Init title animation
  if (typeof requestAnimationFrame !== "undefined") {
    for (let i = 0; i < originalString.length; i++) {
      animateChar(i);
      setTimeout(() => {
        letterCount[i] = 1;
      }, i * 40);
    }
  }
</script>

<div class="background-container">
  <div class="central-container">
    <div class="game-header">
      <h1 id="cogl-title">
        {#each targetSet as letter}
          {letter}
        {/each}
      </h1>

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

  <button class="sikret" on:click={handleClick}>
    {#if show}
      X
    {/if}
  </button>

  <DrawerMenu bind:isDrawerOpen {handleDrawPattern} />

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
