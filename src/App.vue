<template>
  <div id="app">
    <Photo :src="require('@/assets/bird.jpg')" class="photo" />
    <PhotoViewer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Photo from "./components/Photo.vue";
import PhotoViewer from "./components/PhotoViewer.vue";

@Component({
  components: {
    Photo,
    PhotoViewer,
  },
})
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
    width: 60%;
  }
}
</style>
