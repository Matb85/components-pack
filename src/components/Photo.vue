<template>
  <div class="medium-pack-photo" @click="enlarge">
    <img ref="img" :src="src" :data-src="dataSrc" :alt="alt" />
    <i class="cross h-24 w-24"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Photo extends Vue {
  $refs!: { img: HTMLImageElement };
  @Prop({ required: true }) src: string;
  @Prop() dataSrc: string;
  @Prop() alt: string;
  enlarge() {
    if (this.$refs.img.classList.contains("revealed")) this.$root.$emit("enlargePhoto", this.$refs.img);
  }
  mounted() {
    console.log(this.$mediumPack);
    this.$mediumPack.observer.observe(this.$refs.img);
  }
}
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
  > img.revealed {
    cursor: pointer;
    filter: blur(0vw) brightness(100%);
    transform: scale(1);
  }
  &:hover {
    > img.revealed {
      transform: scale(1.05);
      filter: blur(0vw) brightness(60%);
    }
    > img.revealed + .cross {
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
