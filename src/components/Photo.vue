<template>
  <div class="medium-pack-photo" @click="enlarge">
    <figure class="photo-con">
      <img ref="img" :src="src" :alt="alt" />
    </figure>
    <i class="cross h-24 w-24"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Photo extends Vue {
  @Prop() src: string;
  @Prop() alt: string;
  enlarge() {
    this.$root.$emit("enlargePhoto", this.$refs.img);
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
  figure.photo-con {
    overflow: hidden;
    @include wh;
    > img {
      display: block;
      object-fit: cover;
      transition: 0.4s transform, 0.4s filter;
      filter: brightness(100%);
      @include wh;
    }
  }
  .cross {
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

  &:hover {
    figure.photo-con img {
      transform: scale(1.05);
      filter: brightness(60%);
    }
    .cross {
      opacity: 1;
      transform: rotate(180deg);
    }
  }
}
</style>
