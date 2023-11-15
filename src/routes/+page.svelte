<script>
  import "../styles/reset.css";
  import "../styles/globals.css";
  import Cell from "../components/Cell.svelte";
</script>

<svelte:head>
  <title>Conway's Game of Life</title>
  <meta
    name="description"
    content="Create your own pattern in Conway's Game of Life!"
  />
</svelte:head>

<div>
  <Cell isAlive={false} />
</div>

<style>
</style>
