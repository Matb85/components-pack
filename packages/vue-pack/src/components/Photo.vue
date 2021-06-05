<template>
  <div class="medium-pack-photo" @click="enlarge">
    <img
      ref="img"
      :src="src"
      :data-srcset="genSrcset"
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
  data: () => ({ genSrcset: "", genSizes: null }),
  methods: {
    enlarge() {
      if (!this.$refs.img.classList.contains("loaded") || typeof this.dontenlargeonclick !== "undefined") return;
      const enlarger = typeof this.multiview === "undefined" ? "enlargePhoto" : "enlargeManyPhotos";
      this.$root.$emit(enlarger, { rect: this.$el.getBoundingClientRect(), img: this.$refs.img });
    },
  },
  created() {
    const settings = photo(this.src, this.$store.state.vuepacksizes, this.sizes);
    this.genSrcset = settings.genSrcset;
    this.genSizes = settings.genSizes;
  },
  mounted() {
    const img = this.$refs.img;

    if (typeof this.dontaddtolist === "undefined")
      img.addEventListener(
        "load",
        () =>
          this.$store.commit("vuepack/addphoto", {
            src: this.src,
            srcset: this.genSrcset,
            ratio: img.naturalWidth / img.naturalHeight,
            group: this.group,
          }),
        { once: true }
      );
    this.$store.state.vuepack.observer.observe(img);
  },
};
</script>
