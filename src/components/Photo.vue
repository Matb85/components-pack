<template>
  <div class="medium-pack-photo" @click="enlarge">
    <img ref="img" :src="src" :data-src="dataSrc" :data-srcset="dataSrcset" :sizes="sizes" :alt="alt" />
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
    dataSrc: String,
    dataSrcset: String,
    dontenlargeonclick: String,
    multiview: String,
  },
  methods: {
    enlarge() {
      if (this.$refs.img.classList.contains("loaded") && typeof this.dontenlargeonclick === "undefined")
        this.$root.$emit(typeof this.multiview === "undefined" ? "enlargePhoto" : "enlargeManyPhotos", this.$refs.img);
    },
  },
  async mounted() {
    this.$store.state.vuePackModule.observer.observe(this.$refs.img);
  },
};
</script>

<style lang="scss">
@mixin wh($dim: 100%) {
  width: $dim;
  height: $dim;
}

.medium-pack-photo {
  display: block;
  position: relative;
  overflow: hidden;
  > img {
    display: block;
    object-fit: cover;
    @include wh;
    transition: 0.4s transform, 0.4s filter;
    filter: blur(3vw) brightness(100%);
    transform: scale(1.05);
  }
  &:not(.no-hover) > img {
    cursor: pointer;
  }
  > img.loaded {
    filter: blur(0vw) brightness(100%);
    transform: scale(1);
  }
  &:not(.no-hover):hover {
    > img.loaded {
      transform: scale(1.05);
      filter: blur(0vw) brightness(60%);
    }
    > img.loaded + .cross {
      opacity: 1;
      transform: rotate(180deg);
    }
  }
}
.medium-pack-photo .cross {
  $dim: 8rem;
  $offset: calc(50% - #{$dim/2});
  left: $offset;
  top: $offset;
  @include wh($dim);
  display: block;
  position: absolute;
  opacity: 0;
  transition: transform 0.4s, opacity 0.4s;
  &::before,
  &::after {
    position: absolute;
    left: 50%;
    content: " ";
    height: 100%;
    width: 0.4px;
    background-color: white;
  }
  &::after {
    transform: rotate(90deg);
  }
}
</style>
