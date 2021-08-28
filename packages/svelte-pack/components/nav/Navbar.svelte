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
export let className;
let isActive = false;
</script>
