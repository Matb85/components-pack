<template>
  <div class="medium-pack-photo" @click="enlarge">
    <img ref="img" :src="src" :data-srcset="srcset" :sizes="sizes" :alt="alt" data-observerhandler="photo" />
    <span class="cross"></span>
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: {
    src: String,
    alt: String,
    sizes: String,
    srcset: String,
    dontenlargeonclick: String,
    dontaddtolist: String,
    multiview: String,
  },
  methods: {
    enlarge() {
      if (!this.$refs.img.classList.contains("loaded") || typeof this.dontenlargeonclick !== "undefined") return;
      const enlarger = typeof this.multiview === "undefined" ? "enlargePhoto" : "enlargeManyPhotos";
      this.$root.$emit(enlarger, { rect: this.$el.getBoundingClientRect(), img: this.$refs.img });
    },
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
          }),
        { once: true }
      );
    this.$store.state.vuepack.observer.observe(img);
  },
};
</script>
