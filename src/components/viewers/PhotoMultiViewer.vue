<template>
  <section class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
    <div class="photo-slider ms-inner-con" id="photo-slider">
      <div class="first-slide">
        <img ref="img" class="viewed-photo" />
      </div>
      <div v-for="img of imgs" :key="img.src" class="other-slides">
        <div class="wrapper">
          <div class="medium-pack-photo no-hover">
            <img class="ms-lazy" :src="img.src" :data-srcset="img.srcset" />
          </div>
        </div>
      </div>
    </div>
    <!-- navigation -->
    <button id="multi-viewer-prev">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <button id="multi-viewer-next">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <button @click="closeviewer" id="close-multi-viewer"></button>
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";
import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";
import "modular-slider/dist/modular-slider.css";

const Slider = setup(Slidehandler, Noloop);
export default {
  mixins: [Mixin],
  name: "PhotoMultiViewer",
  data: () => ({
    svgPath:
      "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z",
    trigger: "enlargeManyPhotos",
    imgs: [],
    slider: null,
  }),
  async mounted() {
    this.$root.$on(this.trigger, img => {
      this.imgs = this.$store.state.vuepack.photolist.filter(x => x.src !== img.src);
      setTimeout(() => {
        this.slider = new Slider({
          container: "photo-slider",
          transitionSpeed: 500,
          plugins: [lazyloading(), buttons({ prevBtn: "#multi-viewer-prev", nextBtn: "#multi-viewer-next" })],
        });
      }, process.env.VUE_APP_TRANSITION_DUR);
    });
  },
  methods: {
    async closeviewer() {
      await this.close();
      this.slider.slideTo(0);
      this.slider.destroy();
      this.$refs.img.removeAttribute("style");
    },
  },
};
</script>

<style lang="scss">
@mixin wh($dim: 100%) {
  width: $dim;
  height: $dim;
}
.photo-multi-viewer {
  --number-of-slides: 3;
  --slides-per-view: 1;
  cursor: grab;
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
.photo-multi-viewer {
  button {
    cursor: pointer;
    appearance: none;
    border: none;
    position: absolute;
    z-index: 99;
    top: calc(50vh - 2rem);
    background-color: rgba(255, 255, 255, 0.9);
    height: 6rem;
    width: 3rem;
    opacity: 0;
    transition: opacity 0.6s;
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
      display: inline-block;
      path {
        stroke: black;
        stroke-width: 0.5;
      }
    }
  }
  button#multi-viewer-prev {
    left: 0;
    border-radius: 0 999px 999px 0;
    svg {
      margin-left: -0.75rem;
      transform: scaleX(-1);
    }
  }
  button#multi-viewer-next {
    right: 0;
    border-radius: 999px 0 0 999px;
    svg {
      margin-right: -0.75rem;
    }
  }
  button#close-multi-viewer {
    right: 0;
    top: 0;
    @include wh(4rem);
    border-radius: 0 0 0 999px;
    background-color: rgba(255, 255, 255, 0.9);
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

.photo-multi-viewer.photo-viewer-open:not(.photo-viewer-close) button {
  opacity: 1;
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
