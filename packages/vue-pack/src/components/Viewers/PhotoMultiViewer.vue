<template>
  <section aria-label="Photo viewer" class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
    <div aria-hidden="true" class="first-slide">
      <img ref="img" class="viewed-photo" />
    </div>
    <div class="photo-slider ms-inner-con" id="photo-slider">
      <div v-for="img of imgs" :key="img.src" class="other-slides">
        <div
          class="medium-pack-photo no-hover"
          :style="{ '--enlarged-photo-w': img.width, '--enlarged-photo-h': img.height }"
        >
          <img class="ms-lazy" :src="img.src" :data-srcset="img.srcset" :alt="img.alt || 'a photo with no alt text'" />
        </div>
      </div>
    </div>
    <!-- navigation -->
    <button aria-label="previous photo" id="multi-viewer-prev">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <button aria-label="next photo" id="multi-viewer-next">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <div class="medium-pack-photo-viewer-navbar">
      <p v-if="slider != false">
        {{ Math.abs(counter) + 1 }}/{{ imgs.length }}
        {{ imgs[Math.abs(counter)] && imgs[Math.abs(counter)].alt ? " | " + imgs[Math.abs(counter)].alt : "" }}
      </p>
      <button aria-label="close the viewer" @click="closeviewer" id="close-multi-viewer"></button>
    </div>
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";
import { mixin } from "@matb85/base-pack";

import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";

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
    counter: 0,
  }),
  async mounted() {
    window.addEventListener("keyup", (e) => {
      if (!this.slider) return;
      switch (e.key) {
        case "Escape":
          this.closeviewer();
          break;
        case "ArrowLeft":
          this.slider.slideBy(-1);
          break;
        case "ArrowRight":
          this.slider.slideBy(1);
          break;
      }
    });
    this.$root.$on(this.trigger, async ({ img, rect }) => {
      const result = mixin.setupimgs(this.$store.state.vuepack, img);
      this.imgs = result.photos;

      await this.enlargeHandler({ img, rect });
      this.slider = new Slider({
        container: "photo-slider",
        transitionSpeed: 500,
        plugins: [lazyloading(), buttons({ prevBtn: "#multi-viewer-prev", nextBtn: "#multi-viewer-next" })],
      });
      const chosen = this.slider.container.children[result.index].children[0].children[0];
      this.$store.state.vuepack.handlers.photo(chosen);
      this.slider.slideTo(result.index, 0);
      this.counter = this.slider.counter;
      Object.defineProperty(this.slider, "counter", {
        get: () => this.counter,
        set: (val) => (this.counter = val),
      });
      this.$refs.img.addEventListener("animationend", () => (this.$refs.img.parentElement.style.display = "none"));
    });
  },
  methods: {
    async closeviewer() {
      await this.close();
      this.imgs = [];
      this.$refs.img.parentElement.style.display = "block";
      if (!this.slider) return;
      this.slider.slideTo(0);
      this.slider.destroy();
      this.slider = false;
    },
  },
};
</script>
