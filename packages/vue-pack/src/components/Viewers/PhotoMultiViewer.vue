<template>
  <section aria-label="Podgląd wielu zdjęć" class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
    <div aria-hidden="true" class="first-slide">
      <img ref="img" class="viewed-photo" />
    </div>
    <div class="photo-slider ms-inner-con" id="photo-slider">
      <div v-for="img of imgs" :key="img.src" class="other-slides">
        <div
          class="medium-pack-photo no-hover"
          :style="{ '--enlarged-photo-w': img.width, '--enlarged-photo-h': img.height }"
        >
          <img class="ms-lazy" :src="img.src" :data-srcset="img.srcset" :alt="img.alt || 'zdjęcie bez podpisu'" />
        </div>
      </div>
    </div>
    <!-- navigation -->
    <button aria-label="Poprzednie zdjęcie" id="multi-viewer-prev" @click="() => slider?.slidePrev()">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <button aria-label="Kolejne zdjęcie" id="multi-viewer-next" @click="() => slider?.slideNext()">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <div class="medium-pack-photo-viewer-navbar">
      <p v-if="slider != false">
        {{ Math.abs(counter) + 1 }}/{{ imgs.length }}
        {{ imgs[Math.abs(counter)] && imgs[Math.abs(counter)].alt ? " | " + imgs[Math.abs(counter)].alt : "" }}
      </p>
      <button
        aria-label="Zamknij podgląd"
        title="Zamknij podgląd"
        @click="closeviewer"
        id="close-multi-viewer"
      ></button>
    </div>
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";
import { mixin } from "@matb85/base-pack";

import { setup, Slidehandler, Noloop, lazyloading } from "modular-slider";

const Slider = setup(Slidehandler, Noloop);
export default {
  mixins: [Mixin],
  name: "PhotoMultiViewer",
  data: () => ({
    svgPath:
      "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z",
    trigger: "vuepack-enlargemanyphotos",
    imgs: [],
    slider: null,
    counter: 0,
  }),
  async mounted() {
    window.addEventListener(this.trigger, async ({ detail: { img, rect } }) => {
      window.addEventListener("keyup", this.onKeyUp);

      const result = mixin.setupimgs(this.$store.state.vuepack, img);
      this.imgs = result.photos;

      await this.enlargeHandler({ img, rect });
      this.slider = new Slider({
        container: "photo-slider",
        transitionSpeed: 500,
        plugins: [lazyloading()],
      });
      const chosen = this.slider.container.children[result.index].children[0].children[0];
      this.$store.state.vuepack.handlers.photo(chosen);

      this.$refs.img.addEventListener("animationend", () => (this.$refs.img.parentElement.style.display = "none"));
      this.counter = this.slider.counter;
      Object.defineProperty(this.slider, "counter", {
        get: () => this.counter,
        set: val => (this.counter = val),
      });
      setTimeout(() => this.slider.slideTo(result.index, 0), 0);
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
      window.removeEventListener("keyup", this.onKeyUp);
    },
    onKeyUp(e) {
      if (!this.slider) return;
      if (e.key == "Escape") this.closeviewer();
      else if (e.key == "ArrowLeft") this.slider.slidePrev();
      else if (e.key == "ArrowRight") this.slider.slideNext();
    },
  },
};
</script>
