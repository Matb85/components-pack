<template>
  <div id="app">
    <Photo :src="require('@/assets/thumbnail_bird.jpg')" :data-src="require('@/assets/bird.jpg')" class="photo" />
    <Photo
      :src="require('@/assets/thumbnail_gorge.jpg')"
      multiview
      :data-src="require('@/assets/gorge.jpg')"
      class="photo"
    />
    <Photo :src="require('@/assets/thumbnail_bird.jpg')" :data-src="require('@/assets/bird.jpg')" class="photo" />
    <Photo
      :src="require('@/assets/thumbnail_mountains.jpg')"
      :data-src="require('@/assets/mountains.jpg')"
      class="photo"
    />
    <PhotoViewer />
    <PhotoMultiViewer />
    <div style="width: 100%; height:100%;">
      <img
        style="position: relative; left: 2.5%; height: 95%; width: 95%; object-fit: contain"
        src="@/assets/bird.jpg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Photo, PhotoViewer, PhotoMultiViewer } from "@/setup";

@Component({ components: { Photo, PhotoViewer, PhotoMultiViewer } })
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
#app {
  background-color: rgb(190, 190, 190);
  .photo {
    position: relative;
    &:nth-of-type(1) {
      width: 100%;
      height: 100%;
    }
    &:nth-of-type(2) {
      width: 60%;
      float: right;
    }
    &:nth-of-type(3) {
      width: 20%;
    }
    &:nth-of-type(4) {
      width: 50vw;
      height: 50vw;
    }
  }
}
</style>
