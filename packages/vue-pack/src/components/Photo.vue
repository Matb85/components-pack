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
    const sizes = this.$store.state.vuepack.sizes;

    // example: [480, 1920, 2400, integer, integer ...]
    if (Array.isArray(this.sizes)) {
      for (let i = 0; i < this.sizes.length; i++) {
        const sizedsrc = this.src.replace(sizes.thumbnail, sizes[this.sizes[i]]);
        this.genSrcset += `${sizedsrc} ${this.sizes[i]}w, `;
      }
    } else {
      // example: {480: 363, 1920: 433, 2400: 1234, imgversion: sizetopick, ... }
      this.genSizes = "";
      const keys = Object.keys(this.sizes);
      for (let i = 0; i < keys.length; i++) {
        const curSize = keys[i]; //current size
        const sizedsrc = this.src.replace(sizes.thumbnail, sizes[curSize]);
        this.genSrcset += `${sizedsrc} ${keys[i]}w, `;
        if (i < keys.length - 1) this.genSizes += `(max-width: ${this.sizes[curSize]}px) ${curSize}px, `;
      }
      this.genSizes += "100vw";
    }
  },
  mounted() {
    const img = this.$refs.img;

    if (typeof this.dontaddtolist === "undefined")
      img.addEventListener(
        "load",
        () =>
          this.$store.commit("vuepack/addphoto", {
            src: this.src,
            srcset: this.srcset,
            ratio: img.naturalWidth / img.naturalHeight,
            group: this.group,
          }),
        { once: true }
      );
    this.$store.state.vuepack.observer.observe(img);
  },
};
</script>
