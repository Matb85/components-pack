<template>
  <section class="photo-multi-viewer">
    <img ref="img" class="viewed-photo" :src="require('@/assets/fhd_bird.jpg')" />
    <img class="viewed-photo" :src="require('@/assets/thumbnail_bird.jpg')" />
    <img class="viewed-photo" :src="require('@/assets/fhd_bird.jpg')" />
  </section>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PhotoViewerMixin from "@/mixins/photoViewerMixin";

import { tns } from "tiny-slider/src/tiny-slider";

@Component
export default class PhotoViewer extends Mixins(PhotoViewerMixin) {
  mounted() {
    const slider = tns({
      container: ".photo-multi-viewer",
      mouseDrag: true,
      preventScrollOnTouch: "auto",
      items: 1,
      slideBy: 1,
    });
    console.log(slider);
  }
}
</script>

<style lang="scss">
@import "~tiny-slider/src/tiny-slider.scss";
.photo-multi-viewer {
  position: relative;
  width: 100%;
  height: 100vh;
  top: 0;
  > .viewed-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.tns-controls button[data-controls="next"] {
  display: noen;
}
</style>
