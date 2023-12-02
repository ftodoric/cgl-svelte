<script lang="ts">
  import "./styles.css";

  import { SupportedPatterns, glider, lwss } from "$lib/game/cgl-patterns";
  import PatternButton from "./PatternButton/PatternButton.svelte";

  export let isDrawerOpen: boolean;
  export let handleDrawPattern: (pattern: SupportedPatterns) => void;

  const handlePatternClick = (pattern: SupportedPatterns) => (e: any) => {
    e.stopPropagation();
    handleDrawPattern(pattern);

    // Close if on mobile resolutions
    if (window?.innerWidth <= 768) isDrawerOpen = false;
  };
</script>

<div class="drawer-menu" class:drawer-opened={isDrawerOpen}>
  <div class="content" class:content-opened={isDrawerOpen}>
    <div style="font-size: 22px; font-weight: bold;" class="title">
      Explore patterns
    </div>

    <div class="subtitle">Spaceships</div>

    <PatternButton
      pattern={{ name: "Glider", matrix: glider }}
      on:click={handlePatternClick(SupportedPatterns.Glider)}
    />
    <PatternButton
      pattern={{ name: "Light-weight Spaceship", matrix: lwss }}
      on:click={handlePatternClick(SupportedPatterns.LWSS)}
    />
  </div>
</div>
