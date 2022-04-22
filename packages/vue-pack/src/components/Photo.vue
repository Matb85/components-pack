<template>
  <div class="medium-pack-photo" @click="enlarge" role="button" aria-label="photo - click to enlarge">
    <img
      ref="img"
      :src="src"
      :data-src="src"
      :data-srcset="genSrcset"
      :data-enlargedsrcset="enlargedsrcset"
      :sizes="genSizes"
      :alt="alt"
      :data-group="group"
      data-observerhandler="photo"
    />
    <span class="cross"></span>
  </div>
</template>

<script>
import { photo } from "@matb85/base-pack";

export default {
  name: "Photo",
  props: {
    src: String,
    alt: String,
    sizes: [Array, Object],
    dontenlargeonclick: String,
    dontaddtolist: String,
    multiview: String,
    group: String,
  },
  data: () => ({ genSrcset: "", genSizes: null, enlargedsrcset: "" }),
  methods: {
    enlarge() {
      if (!this.$refs.img.classList.contains("loaded") || typeof this.dontenlargeonclick !== "undefined") return;
      const enlarger = typeof this.multiview === "undefined" ? "vuepack-enlargephoto" : "vuepack-enlargemanyphotos";
      window.dispatchEvent(
        new CustomEvent(enlarger, { detail: { rect: this.$el.getBoundingClientRect(), img: this.$refs.img } })
      );
    },
  },
  watch: {
    src() {
      this.genSrcset = photo(this.src, this.$store.state.vuepacksizes.formats, this.sizes).genSrcset;
      if (this.$refs.img.classList.contains("loaded")) this.$refs.img.srcset = this.genSrcset;
    },
  },
  created() {
    /** @type {import('@matb85/base-pack').StoreDataI}  */
    const GlobalConfig = this.$store.state.vuepacksizes;

    const settings = photo(this.src, GlobalConfig.formats, this.sizes);
    this.genSrcset = settings.genSrcset;
    this.genSizes = settings.genSizes;

    this.enlargedsrcset = photo(this.src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset;
  },
  mounted() {
    const img = this.$refs.img;

    if (typeof this.dontaddtolist === "undefined")
      img.addEventListener(
        "load",
        () =>
          this.$store.commit("vuepack/addphoto", {
            src: this.src,
            srcset: this.enlargedsrcset,
            ratio: img.naturalWidth / img.naturalHeight,
            group: this.group,
            alt: this.alt,
          }),
        { once: true }
      );
    this.$store.state.vuepack.observer.observe(img);
  },
};
</script>
