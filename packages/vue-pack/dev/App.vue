<template>
  <div id="app">
    <Photo src="/assets/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" />

    <Photo
      src="/assets/thumbnail_gorge.jpg"
      multiview
      :sizes="[720, 1290, 1920, 2400]"
      class="photo"
      group="mountains"
    />
    <Photo src="/assets/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" />
    <Photo src="/assets/thumbnail_mountains.jpg" :sizes="[2400]" class="photo" group="mountains" />

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
