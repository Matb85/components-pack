<template>
  <section class="photo-multi-viewer photo-viewer">
    <div class="first-slide">
      <img ref="img" class="viewed-photo" />
    </div>
    <div v-for="img of allImgs" :key="img.das" class="other-slides">
      <div class="wrapper">
        <div class="medium-pack-photo no-hover">
          <img class="tns-lazy" :src="img.src" :data-src="img.dataset.src" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PhotoViewerMixin from "@/mixins/photoViewerMixin";
import { Photo } from "@/setup";
import { tns } from "tiny-slider/src/tiny-slider";

@Component({ components: { Photo } })
export default class PhotoViewer extends Mixins(PhotoViewerMixin) {
  trigger = "enlargeManyPhotos";
  allImgs: HTMLImageElement[] = [];
  mounted() {
    this.$root.$on(this.trigger, (img: HTMLImageElement) => {
      this.allImgs = Array.from(
        document.querySelectorAll("div.medium-pack-photo > img:not(.tns-lazy)") as NodeListOf<HTMLImageElement>
      );
      this.$refs.img.addEventListener(
        "transitionend",
        () => {
          this.$refs.img.style.animation = "none";
          console.log("animationend");

          const slider = tns({
            container: ".photo-multi-viewer",
            mouseDrag: true,
            preventScrollOnTouch: "auto",
            lazyload: true,
            lazyloadSelector: ".tns-lazy",
            items: 1,
            slideBy: 1,
          });
        },
        { once: true }
      );
    });
    //const setObj = new Set(); // create key value pair from array of array
    //const nodes: HTMLImageElement[] = Array.from(
    //  document.querySelectorAll("div.medium-pack-photo > img:not(.tns-lazy)") as NodeListOf<HTMLImageElement>
    //);
    //console.log(nodes);
    //const result = nodes.reduce((acc, item) => {
    //  if (!setObj.has(item.dataset.src)) {
    //    setObj.add(item.dataset.src);
    //    acc.push(item);
    //  }
    //  return acc;
    //}, []);
    //this.allImgs = result;
    //console.log(this.allImgs);
  }
}
</script>

<style lang="scss">
@import "~tiny-slider/src/tiny-slider.scss";

@mixin wh($dim: 100%) {
  width: $dim;
  height: $dim;
}
.photo-multi-viewer {
  cursor: grab;
  width: 100%;
  height: 100vh;
  .medium-pack-photo.tns-slide-clone > img {
    filter: blur(0vw) !important;
  }
  > .viewed-photo {
    @include wh;
    object-fit: cover;
  }
  .first-slide {
    @include wh;
    position: relative;
  }
  .other-slides {
    @include wh;
    .wrapper {
      @include wh;
      display: flex;
      justify-content: center;
      align-items: center;
      .medium-pack-photo {
        width: auto;
        height: auto;
        max-width: 95%;
        max-height: 95%;
      }
    }
  }
}
.tns-controls button[data-controls="next"] {
  display: noen;
}
</style>
