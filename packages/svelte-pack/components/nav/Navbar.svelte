<nav class="navbar {className}">
  <slot name="logo" />
  <div class="nav" style="{isActive ? 'transform: translateX(-100%)' : ''}">
    <slot />
  </div>
  <div
    class="hamburger-container"
    on:click="{() => {
      isActive = !isActive;
    }}">
    <div class="hamburger {isActive ? 'is-active' : ''}">
      <div class="hamburger-inner"></div>
    </div>
  </div>
</nav>

<script>
import { onMount, onDestroy } from "svelte";
export let className = "";
let isActive = false;

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
