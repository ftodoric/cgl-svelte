<script>
  export let isAlive = false;
  export let isFirstRow = false;
  export let isFirstCol = false;
  export let size = 15;
  export let readOnly = false;
</script>

<button
  class="cell-container"
  class:alive={isAlive}
  class:first-row={isFirstRow}
  class:first-col={isFirstCol}
  class:read-only={readOnly}
  style="flex: {size}px 0 0; height: {size}px;"
  on:click
/>

<style>
  .cell-container {
    border: none;

    background-color: var(--cell-dead);
    border-right: 1px solid var(--surface-s1);
    border-bottom: 1px solid var(--surface-s1);

    border-radius: 3px;

    /* transition: background-color 0.1s; */
  }

  .cell-container:hover {
    cursor: pointer;
  }

  .read-only:hover {
    cursor: default;
  }

  .alive {
    background-color: var(--cell-alive);
  }

  .first-row {
    border-top: 1px solid var(--surface-s1);
  }

  .first-col {
    border-left: 1px solid var(--surface-s1);
  }
</style>
