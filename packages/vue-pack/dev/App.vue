<template>
  <div id="app">
    <Photo :src="require('@/assets/thumbnail_bird.jpg')" :srcset="require('@/assets/bird.jpg')" class="photo" />
    <Photo
      :src="require('@/assets/thumbnail_gorge.jpg')"
      multiview
      :srcset="`${require('@/assets/hvga_gorge.jpg')} 720w, ${require('@/assets/hd_gorge.jpg')} 1280w, ${require('@/assets/fhd_gorge.jpg')} 1920w, ${require('@/assets/gorge.jpg')} 2400w`"
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

<script>
import PhotoMultiViewer from "../src/components/Viewers/PhotoMultiViewer.vue";
import PhotoViewer from "../src/components/Viewers/PhotoViewer.vue";
import Photo from "../src/components/Photo.vue";

export default {
  components: { Photo, PhotoViewer, PhotoMultiViewer },
  mounted() {
    this.$store.commit("vuepack/addhandler", {
      name: "map",
      handler: () => {
        console.log("hi");
      },
    });
  },
};
</script>

<style>
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

#app .photo {
  position: relative;
}

.photo:nth-of-type(1) {
  width: 100%;
  height: 100%;
}
.photo:nth-of-type(2) {
  width: 60%;
}
.photo:nth-of-type(3) {
  width: 20%;
}
.photo:nth-of-type(4) {
  width: 50vw;
  height: 50vw;
}
</style>
