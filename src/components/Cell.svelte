<script>
  export let isAlive = false;
</script>

<div class:cell-container={true} class:is-alive={isAlive} />

<style>
  .cell-container {
    width: 10px;
    height: 10px;
    background-color: red;
  }

  .is-alive {
    background-color: black;
  }
</style>
