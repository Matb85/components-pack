<template>
  <section class="photo-multi-viewer photo-viewer">
    <div class="first-slide">
      <img ref="img" class="viewed-photo" />
    </div>
    <div v-for="img of allImgs" :key="img.src" class="other-slides">
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
import { tns } from "tiny-slider/src/tiny-slider";
import arrow from "!raw-loader!@/assets/arrow.svg";
console.log(arrow);
type ImageArray = HTMLImageElement[];

@Component
export default class PhotoMultiViewer extends Mixins(PhotoViewerMixin) {
  trigger = "enlargeManyPhotos";
  allImgs: HTMLImageElement[] = [];

  mounted() {
    this.$root.$on(this.trigger, (img: HTMLImageElement) => {
      const setObj: Array<string | undefined> = []; // create key value pair from array of array
      const nodes: ImageArray = Array.from(
        document.querySelectorAll("div.medium-pack-photo > img:not(.tns-lazy)") as NodeListOf<HTMLImageElement>
      ).filter(x => x.src !== img.src);
      console.log(nodes);
      this.allImgs = nodes.reduce((acc: ImageArray, item) => {
        if (!setObj.includes(item.dataset.src)) {
          setObj.push(item.dataset.src);
          acc.push(item);
        }
        return acc;
      }, []);

      this.$refs.img.addEventListener(
        "transitionend",
        () => {
          this.$refs.img.style.animation = "none";
          const slider = tns({
            container: ".photo-multi-viewer",
            mouseDrag: true,
            preventScrollOnTouch: "auto",
            lazyload: true,
            lazyloadSelector: ".tns-lazy",
            items: 1,
            controlsText: [arrow, arrow],
            slideBy: 1,
            nav: false,
          });
        },
        { once: true }
      );
    });
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
.tns-controls {
  button {
    appearance: none;
    border: none;
    position: fixed;
    top: calc(50vh - 2rem);
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
    height: 6rem;
    width: 3rem;
    opacity: 0.6;
    animation: 0.6s appear;
    transition: opacity 0.4s;
    &:hover,
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: 1;
    }
    svg {
      width: 1.25rem;
      height: auto;
      path {
        stroke: black;
        stroke-width: 0.5;
      }
    }
  }
  button[data-controls="prev"] {
    left: 0;
    border-radius: 0 999px 999px 0;
    svg {
      margin-left: -0.5rem;
      transform: scaleX(-1);
    }
  }
  button[data-controls="next"] {
    right: 0;
    border-radius: 999px 0 0 999px;
    svg {
      margin-right: -0.5rem;
    }
  }
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.6;
  }
}
</style>
