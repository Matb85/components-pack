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

<script>
import { onMount, onDestroy } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {string} [className]
   * @property {import('svelte').Snippet} [logo]
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { className = "", logo, children } = $props();
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
