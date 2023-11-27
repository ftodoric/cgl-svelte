<script lang="ts">
  import type { BoardMatrix } from "$lib/game/types";
  import Cell from "./Cell.svelte";

  export let boardMatrix: BoardMatrix;
</script>

<div class="board-container">
  {#if boardMatrix}
    <div class="game-board">
      {#each boardMatrix as row, rowIndex}
        <div class="board-row" style="width: calc(7 * 15px);">
          {#each row as cell, colIndex}
            <Cell
              size={15}
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
    <div>Loading</div>
  {/if}
</div>

<style>
  .board-container {
    margin-top: 50px;

    display: flex;
    justify-content: center;
    background-color: red;
  }

  .game-board {
    display: flex;
    flex-direction: column;
  }

  .board-row {
    width: 100%;
    display: flex;
  }
</style>
