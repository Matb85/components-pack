<template>
  <div id="app">
    <Photo :src="require('@/assets/thumbnail_bird.jpg')" :srcset="require('@/assets/bird.jpg')" class="photo" />
    <Photo
      :src="require('@/assets/thumbnail_gorge.jpg')"
      multiview
      :srcset="
        `${require('@/assets/hvga_gorge.jpg')} 720w, ${require('@/assets/hd_gorge.jpg')} 1280w, ${require('@/assets/fhd_gorge.jpg')} 1920w, ${require('@/assets/gorge.jpg')} 2400w`
      "
      class="photo"
    />
    <Photo :src="require('@/assets/thumbnail_bird.jpg')" :srcset="require('@/assets/bird.jpg')" class="photo" />
    <Photo
      :src="require('@/assets/thumbnail_mountains.jpg')"
      :srcset="require('@/assets/mountains.jpg')"
      class="photo"
    />
    <PhotoViewer />
    <PhotoMultiViewer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PhotoMultiViewer from "@/components/Viewers/PhotoMultiViewer.vue";
import PhotoViewer from "@/components/Viewers/PhotoViewer.vue";
import Photo from "@/components/Photo.vue";

@Component({ components: { Photo, PhotoViewer, PhotoMultiViewer } })
export default class App extends Vue {
  mounted() {
    this.$store.commit("vuepack/addhandler", {
      name: "map",
      handler: () => {
        console.log("hi");
      },
    });
  }
}
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
