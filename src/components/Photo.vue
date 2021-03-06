<template>
  <div class="photo-con" @click="enlarge">
    <div class="cross-con">
      <i class="cross h-24 w-24"></i>
    </div>
    <figure>
      <img ref="img" :src="src" :alt="alt" />
    </figure>
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
.photo-con:hover {
  figure img {
    transform: scale(1.05);
  }
  .action {
    opacity: 1;
    i {
      transform: rotate(180deg);
    }
  }
}
.photo-con.no-zoom > .action-con {
  display: none;
}
.action-con {
  padding: inherit;
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding-top: 0;
  padding-left: 0;
  .action {
    opacity: 0;
    padding: inherit;
    background-color: rgba(0, 0, 0, 0.6);
    transition: 0.4s opacity;
    i {
      transition: transform 0.6s;
    }
  }
}
.photo-con figure img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: 0.4s transform;
}
.photo-con.i-1by1 figure {
  padding-top: 100%;
}
.photo-con.i-2by1 figure {
  padding-top: 50%;
}
.photo-con.i-3by2 figure {
  padding-top: 66.6666%;
}
.photo-con.i-1by1 figure,
.photo-con.i-2by1 figure,
.photo-con.i-3by2 > figure {
  height: 0;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
// &.is-1by1
//    padding-top: 100%
//  &.is-5by4
//    padding-top: 80%
//  &.is-4by3
//    padding-top: 75%
//  &.is-3by2
//    padding-top: 66.6666%
//  &.is-5by3
//    padding-top: 60%
//  &.is-16by9
//    padding-top: 56.25%
//  &.is-2by1
//    padding-top: 50%
//  &.is-3by1
//    padding-top: 33.3333%
//  &.is-4by5
//    padding-top: 125%
//  &.is-3by4
//    padding-top: 133.3333%
//  &.is-2by3
//    padding-top: 150%
//  &.is-3by5
//    padding-top: 166.6666%
//  &.is-9by16
//    padding-top: 177.7777%
//  &.is-1by2
//    padding-top: 200%
//  &.is-1by3
//    padding-top: 300%
</style>
