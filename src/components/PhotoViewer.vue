<template>
  <section class="photo-viewer" @click="close">
    <img ref="img" class="viewed-photo" />
  </section>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PhotoViewerMixin from "../mixins/photoViewerMixin";

@Component
export default class PhotoViewer extends Mixins(PhotoViewerMixin) {
  trigger = "enlargePhoto";
}
</script>

<style lang="scss">
@mixin wh($dim: 100%) {
  width: $dim;
  height: $dim;
}
.photo-viewer {
  cursor: zoom-out;
  background-color: rgba(255, 255, 255, 0);
  transition-property: opacity, background-color;
  transition-duration: 0.6s;
  top: 200vh;
  position: fixed;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100vh;
  .viewed-photo {
    object-fit: cover;
    position: relative;
    transform: scale(1.05);
    transition: 0.6s all !important;
  }
}
html .photo-viewer-close {
  opacity: 0;
}
.photo-viewer-open {
  top: 0;
  background-color: white;
  .viewed-photo {
    $h: var(--enlarged-photo-h);
    $w: var(--enlarged-photo-w);
    transform: scale(1);

    width: $w !important;
    height: $h !important;
    top: calc((100vh - #{$h}) / 2) !important;
    left: calc((100% - #{$w}) / 2) !important;
    //animation: 0.6s place-img forwards;
  }
}

@keyframes place-img {
  to {
    $h: var(--enlarged-photo-h);
    $w: var(--enlarged-photo-w);
    transform: scale(1);

    width: $w;
    height: $h;
    top: calc((100vh - #{$h}) / 2);
    left: calc((100% - #{$w}) / 2);
  }
}
</style>
