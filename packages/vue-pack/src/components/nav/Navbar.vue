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
    if (typeof window != "undefined") window.addEventListener("MP-navbar-mobile-close", () => this.close());
  },
  destroyed() {
    if (typeof window != "undefined") window.removeEventListener("MP-navbar-mobile-close", () => this.close());
  },
  methods: {
    close() {
      this.isActive = false;
    },
  },
};
</script>
