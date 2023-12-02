<script lang="ts">
  import "./styles.css";

  import type { BoardMatrix } from "$lib/game/types";
  import Board from "../../Board/Board.svelte";

  export let pattern: { name: string; matrix: BoardMatrix };
</script>

<button class="pattern-button" on:click>
  <div
    style="display: flex; justify-content: space-between; align-items: center;"
  >
    <div class="pattern-name" style="color: #fff;">{pattern.name}</div>

    <Board boardMatrix={pattern.matrix} readOnly />
  </div>
</button>
