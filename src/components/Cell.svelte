<script>
  export let isAlive = false;
</script>

<div class:cell-container={true} class:is-alive={isAlive} />

<style>
  .cell-container {
    width: 10px;
    height: 10px;
    background-color: #555;
  }

  .is-alive {
    background-color: #ddd;
  }
</style>
