<script lang="ts">
  import "./styles.css";

  import IconArrow from "$lib/components/Icons/IconArrow.svelte";
  import IconDelete from "$lib/components/Icons/IconDelete.svelte";
  import IconExpand from "$lib/components/Icons/IconExpand.svelte";
  import IconPause from "$lib/components/Icons/IconPause.svelte";
  import IconPlay from "$lib/components/Icons/IconPlay.svelte";
  import IconRandomize from "$lib/components/Icons/IconRandomize.svelte";
  import IconReset from "$lib/components/Icons/IconReset.svelte";
  import IconSpeed from "$lib/components/Icons/IconSpeed.svelte";
  import type { BoardMatrix } from "$lib/game/types";
  import { getIsBoardEmpty } from "$lib/game/mechanics";

  export let isGameRunning: boolean;

  // Config
  export let boardSize: number;
  export let speed: number;
  export let boardMatrix: BoardMatrix;

  // Controls
  export let handlePlay: () => void;
  export let handlePause: () => void;
  export let handleReset: () => void;
  export let handleRandomize: () => void;
  export let handleCleanBoard: () => void;

  $: isBoardEmpty = getIsBoardEmpty(boardMatrix);

  $: isCleanAllDisabled = isGameRunning || isBoardEmpty;
</script>

<div class="control-bar">
  <!-- Game Config -->
  <div class="game-config">
    <div class="input-group" title="Board Size">
      <IconExpand fill="var(--primary)" />
      <input
        class="control-input"
        bind:value={boardSize}
        type="number"
        disabled={isGameRunning}
      />

      <div class="input-spinners">
        <button
          on:click={() => {
            boardSize += 1;
          }}
          disabled={isGameRunning}
          style="transform: rotate(180deg);"
        >
          <IconArrow
            w="10px"
            h="10px"
            fill={isGameRunning ? "var(--primary-dimmed)" : "var(--primary)"}
          />
        </button>
        <button
          on:click={() => {
            boardSize -= 1;
          }}
          disabled={isGameRunning}
        >
          <IconArrow
            w="10px"
            h="10px"
            fill={isGameRunning ? "var(--primary-dimmed)" : "var(--primary)"}
          />
        </button>
      </div>
    </div>

    <div class="input-group" style="margin-left: 20px;" title="Game Speed">
      <IconSpeed fill="var(--primary)" />
      <input class="control-input" bind:value={speed} type="number" />

      <div class="input-spinners">
        <button
          on:click={() => {
            speed += 1;
          }}
          style="transform: rotate(180deg);"
        >
          <IconArrow w="10px" h="10px" fill="var(--primary)" />
        </button>
        <button
          on:click={() => {
            speed -= 1;
          }}
        >
          <IconArrow w="10px" h="10px" fill="var(--primary)" />
        </button>
      </div>
    </div>
  </div>

  <!-- Game Controls -->
  <div class="button-group">
    <button
      class="control-button"
      on:click={() => (isGameRunning ? handlePause() : handlePlay())}
      disabled={isBoardEmpty}
      title={isGameRunning ? "Pause" : "Play"}
    >
      {#if isGameRunning}
        <IconPause
          fill={isBoardEmpty ? "var(--primary-dimmed)" : "var(--primary)"}
          w="20"
          h="20"
        />
      {:else}
        <IconPlay
          fill={isBoardEmpty ? "var(--primary-dimmed)" : "var(--primary)"}
          w="20"
          h="20"
        />
      {/if}
    </button>

    <button class="control-button" on:click={handleReset} title="Reset">
      <IconReset fill="var(--primary)" />
    </button>

    <button
      class="control-button"
      on:click={handleRandomize}
      disabled={isGameRunning}
      title="Randomize"
    >
      <IconRandomize
        fill={isGameRunning ? "var(--primary-dimmed)" : "var(--primary)"}
        w="24"
        h="24"
      />
    </button>

    <button
      class="control-button"
      on:click={handleCleanBoard}
      disabled={isCleanAllDisabled}
      title="Clean the Board"
    >
      <IconDelete
        fill={isCleanAllDisabled ? "var(--primary-dimmed)" : "var(--primary)"}
        w="24"
        h="24"
      />
    </button>
  </div>
</div>
