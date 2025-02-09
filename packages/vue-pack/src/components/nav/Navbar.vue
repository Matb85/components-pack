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

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";

const isActive = ref(false);

const close = () => {
  isActive.value = false;
};

onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("MP-navbar-mobile-close", close);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("MP-navbar-mobile-close", close);
  }
});
</script>
