<script lang="ts">
  import "./styles.css";

  import { SupportedPatterns, glider, lwss } from "$lib/game/cgl-patterns";
  import Board from "../Board/Board.svelte";

  export let isDrawerOpen: boolean;
  export let handleDrawPattern: (pattern: SupportedPatterns) => void;
</script>

<div class="drawer-menu" class:drawer-opened={isDrawerOpen}>
  <div class="content" class:content-opened={isDrawerOpen}>
    <div style="font-size: 22px; font-weight: bold;" class="title">
      Explore patterns
    </div>

    <div class="subtitle">Spaceships</div>

    <button
      class="pattern-button"
      on:click={(e) => {
        e.stopPropagation();
        handleDrawPattern(SupportedPatterns.Glider);
      }}
    >
      <div
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <div style="color: #fff;">Glider</div>

        <Board boardMatrix={glider} readOnly />
      </div>
    </button>

    <button
      class="pattern-button"
      on:click={(e) => {
        e.stopPropagation();
        handleDrawPattern(SupportedPatterns.LWSS);
      }}
    >
      <div
        style="display: flex; justify-content: space-between; align-items: center;"
      >
        <div style="color: #fff;">Light-weight Spaceship</div>

        <Board boardMatrix={lwss} readOnly />
      </div>
    </button>
  </div>
</div>
