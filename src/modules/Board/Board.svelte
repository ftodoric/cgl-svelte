<script lang="ts">
  import type { BoardMatrix } from "$lib/game/types";
  import Cell from "./Cell.svelte";

  export let boardMatrix: BoardMatrix;
  export let cellSize = 15;
  export let readOnly = false;
</script>

<div
  class="board-container"
  style="width: calc({boardMatrix[0].length} * {cellSize}px);"
>
  {#if boardMatrix}
    <div class="game-board">
      {#each boardMatrix as row, rowIndex}
        <div class="board-row">
          {#each row as cell, colIndex}
            <Cell
              size={cellSize}
              isAlive={cell}
              isFirstRow={rowIndex === 0}
              isFirstCol={colIndex === 0}
              {readOnly}
              on:click={() => {
                if (!readOnly) cell = !cell;
              }}
            />
          {/each}
        </div>
      {/each}
    </div>
  {:else}
    <div style="color: var(--primary);">Loading...</div>
  {/if}
</div>

<style>
  .board-container {
    border-radius: 3px;
    background-color: var(--surface-s1);
  }

  .game-board {
    display: flex;
    flex-direction: column;
  }

  .board-row {
    display: flex;
  }
</style>
