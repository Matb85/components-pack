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
};
</script>
