<script lang="ts">
  import type { BoardMatrix } from "$lib/game/types";
  import Cell from "./Cell.svelte";

  export let boardMatrix: BoardMatrix;
  export let cellSize = 15;
</script>

<div class="board-container">
  {#if boardMatrix}
    <div class="game-board">
      {#each boardMatrix as row, rowIndex}
        <div
          class="board-row"
          style="width: calc({boardMatrix.length} * {cellSize}px);"
        >
          {#each row as cell, colIndex}
            <Cell
              size={cellSize}
              isAlive={cell}
              isFirstRow={rowIndex === 0}
              isFirstCol={colIndex === 0}
              on:click={() => (cell = !cell)}
            />
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <div style="color: var(--light-primary);">Loading...</div>
  {/if}
</div>

<style>
  .board-container {
    margin-top: 50px;
    background-color: var(--board-bg);
    border-radius: 3px;
  }

  .game-board {
    display: flex;
    flex-direction: column;
  }

  .board-row {
    display: flex;
  }
</style>
