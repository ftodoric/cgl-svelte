<script lang="ts">
  import "../styles/reset.css";
  import "../styles/globals.css";
  import Cell from "../components/Cell.svelte";

  const initialBoardState = {
    width: 10,
    height: 10,
    aliveMatrixIndices: [
      [0, 0],
      [1, 1],
      [4, 6],
    ],
  };

  const isCellAlive = (rowIndex: number, colIndex: number) => {
    return initialBoardState.aliveMatrixIndices.includes([rowIndex, colIndex]);
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
  {#each [...Array(initialBoardState.height).keys()] as rowIndex}
    <div class="board-row">
      {#each [...Array(initialBoardState.width).keys()] as colIndex}
        <Cell isAlive={isCellAlive(rowIndex, colIndex)} />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board-row {
    display: flex;
  }
</style>
