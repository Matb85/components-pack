<template>
  <nav class="navbar">
    <slot name="logo"></slot>
    <div class="nav" :style="isActive ? 'transform: translateX(-100%)' : ''">
      <slot></slot>
    </div>
    <div class="hamburger-container" @click="isActive = !isActive">
      <div class="hamburger" :class="{ 'is-active': isActive }">
        <div class="hamburger-inner"></div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({ isActive: false }),
  mounted() {
    window.addEventListener("medium-pack-navbar-mobile-close", () => this.close());
  },
  destroyed() {
    window.removeEventListener("medium-pack-navbar-mobile-close", () => this.close());
  },
  methods: {
    close() {
      this.isActive = false;
    },
  },
};
</script>
