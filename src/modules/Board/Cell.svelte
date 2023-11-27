<script>
  export let isAlive = false;
  export let isFirstRow = false;
  export let isFirstCol = false;
  export let size = 15;
</script>

<button
  class="cell-container"
  class:alive={isAlive}
  class:first-row={isFirstRow}
  class:first-col={isFirstCol}
  style="flex: {size}px 0 0; height: {size}px;"
  on:click
/>

<style>
  .cell-container {
    border: none;

    background-color: var(--cell-color-dead);
    border-right: 1px solid var(--board-bg);
    border-bottom: 1px solid var(--board-bg);
  }

  .alive {
    background-color: var(--cell-color-alive);
  }

  .first-row {
    border-top: 1px solid var(--board-bg);
  }

  .first-col {
    border-left: 1px solid var(--board-bg);
  }
</style>
