<template>
  <section class="photo-multi-viewer photo-viewer">
    <div class="photo-slider">
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
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import PhotoViewerMixin from "@/mixins/photoViewerMixin";
import { tns, TinySliderInstance } from "tiny-slider/src/tiny-slider";
import arrow from "!raw-loader!@/assets/arrow.svg";
const IMGPATH = ".photo-multi-viewer .first-slide img.viewed-photo";
type ImageArray = HTMLImageElement[];

@Component
export default class PhotoMultiViewer extends Mixins(PhotoViewerMixin) {
  trigger = "enlargeManyPhotos";
  allImgs: HTMLImageElement[] = [];
  slider: null | TinySliderInstance;
  mounted() {
    this.$root.$on(this.trigger, (img: HTMLImageElement) => {
      /** reset reference for the enlarged image */
      this.$refs.img = document.querySelector(IMGPATH) as HTMLImageElement;

      /** get all the images on the page exluding those with duplicate urls and the enlarged picture */
      const setObj: Array<string | undefined> = []; // create key value pair from array of array
      const nodes: ImageArray = Array.from(
        document.querySelectorAll("div.medium-pack-photo > img:not(.tns-lazy)") as NodeListOf<HTMLImageElement>
      ).filter(x => x.src !== img.src);
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
          if (!this.slider) {
            this.slider = tns({
              container: ".photo-slider",
              mouseDrag: true,
              preventScrollOnTouch: "auto",
              lazyload: true,
              lazyloadSelector: ".tns-lazy",
              items: 1,
              controlsText: [arrow, arrow],
              slideBy: 1,
              nav: false,
            });
          } else {
            this.slider = this.slider.rebuild();
          }

          const closeBtn = document.createElement("button");
          closeBtn.classList.add("tns-close-multi-viewer");
          closeBtn.addEventListener(
            "click",
            async () => {
              await this.close();
              if (this.slider) this.slider.destroy();
              this.$refs.img = document.querySelector(IMGPATH) as HTMLImageElement;
              this.$refs.img.removeAttribute("style");
            },
            { once: true }
          );
          document.querySelector(".tns-outer > .tns-controls")?.appendChild(closeBtn);
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
  .photo-slider {
    width: 100%;
    height: 100vh;
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
    cursor: pointer;
    appearance: none;
    border: none;
    position: fixed;
    z-index: 99;
    top: calc(50vh - 2rem);
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
      margin-left: -0.75rem;
      transform: scaleX(-1);
    }
  }
  button[data-controls="next"] {
    right: 0;
    border-radius: 999px 0 0 999px;
    svg {
      margin-right: -0.75rem;
    }
  }
  button.tns-close-multi-viewer {
    right: 0;
    top: 0;
    @include wh(4rem);
    border-radius: 0 0 0 999px;
    background-color: rgba(255, 255, 255, 0.9);
    //background-color: rgba(0, 0, 0, 0.9);
    &:before,
    &:after {
      position: absolute;
      top: 0.9rem;
      right: 1.6rem;
      content: " ";
      height: 1.5rem;
      width: 2px;
      background-color: black;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
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
