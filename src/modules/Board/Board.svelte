<script lang="ts">
  import Cell from "../../components/Cell.svelte";

  export let cells: number[][];
</script>

<div class="board-container">
  {#if cells}
    <div class="game-board">
      {#each cells as _, rowIndex}
        <div class="board-row" style="width: calc(7 * 15px);">
          {#each cells[rowIndex] as cell, colIndex}
            <Cell
              size={15}
              isAlive={!!cell}
              isFirstRow={rowIndex === 0}
              isFirstCol={colIndex === 0}
              on:click={() => {
                cells[rowIndex][colIndex] = 1 - cells[rowIndex][colIndex];
              }}
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
