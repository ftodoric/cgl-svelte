<script>
  export let isAlive = false;

  export let isFirstRow = false;
  export let isFirstCol = false;
</script>

<div
  class:cell-container={true}
  class:is-alive={isAlive}
  class:is-first-row={isFirstRow}
  class:is-first-col={isFirstCol}
/>

<style>
  .cell-container {
    flex: 10px 0 0;
    height: 10px;
    background-color: #555;
    border-right: 1px solid #888;
    border-bottom: 1px solid #888;
  }

  .is-alive {
    background-color: #fff;
  }

  .is-first-row {
    border-top: 1px solid #888;
  }

  .is-first-col {
    border-left: 1px solid #888;
  }
</style>
