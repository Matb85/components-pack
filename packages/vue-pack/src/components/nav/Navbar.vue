<template>
  <nav class="navbar">
    <slot name="logo"></slot>
    <div class="nav" :style="isActive ? 'transform: translateX(-100%)' : ''">
      <slot></slot>
    </div>
    <button class="hamburger-container" @click="isActive = !isActive">
      <span class="hamburger" :class="{ 'is-active': isActive }">
        <span class="hamburger-inner"></span>
      </span>
    </button>
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
