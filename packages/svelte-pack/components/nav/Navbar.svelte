<nav class="navbar {className}">
  {@render logo?.()}
  <div class="nav" style="{isActive ? 'transform: translateX(-100%)' : ''}">
    {@render children?.()}
  </div>
  <button
    class="hamburger-container"
    aria-label="menu"
    onclick={() => {
      isActive = !isActive;
    }}>
    <span class="hamburger {isActive ? 'is-active' : ''}">
      <span class="hamburger-inner"></span>
    </span>
  </button>
</nav>

<script lang="ts">
  import { onDestroy, onMount, type Snippet } from "svelte";

  interface Props {
    className?: string;
    logo?: Snippet;
    children?: Snippet;
  }

  let { className = "", logo, children }: Props = $props();
  let isActive = $state(false);

  onMount(() => {
    if (typeof window != "undefined") window.addEventListener("MP-navbar-mobile-close", () => close());
  });
  onDestroy(() => {
    if (typeof window != "undefined") window.removeEventListener("MP-navbar-mobile-close", () => close());
  });

  function close() {
    isActive = false;
  }
</script>
