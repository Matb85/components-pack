<template>
  <section class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
    <div class="photo-slider ms-inner-con" id="photo-slider">
      <div class="first-slide">
        <img ref="img" class="viewed-photo" />
      </div>
      <div v-for="img of imgs" :key="img.src" class="other-slides">
        <div class="wrapper">
          <div
            class="medium-pack-photo no-hover"
            :style="{ '--enlarged-photo-w': img.width, '--enlarged-photo-h': img.height }"
          >
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
    this.$root.$on(this.trigger, ({ img }) => {
      this.imgs = this.$store.state.vuepack.photolist[img.dataset.group || "rest"].filter((x) => {
        const { w, h } = this.getdimensions(x.ratio);
        x.width = w;
        x.height = h;
        return x.srcset !== img.srcset;
      });
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
      this.imgs = [];
      this.slider.slideTo(0);
      this.slider.destroy();
      this.$refs.img.removeAttribute("style");
    },
  },
};
</script>
