<template>
  <div id="app">
    <Navbar style="background-color: white">
      <template v-slot:logo><h1>logo</h1></template>
      <p v-for="nav of [1, 2, 3]" :key="nav">nav</p>
    </Navbar>
    <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" />

    <Photo
      src="/thumbnail_gorge.jpg"
      multiview
      :sizes="[720, 1290, 1920, 2400]"
      class="photo"
      group="mountains"
      alt="a photo of the Dunajec Gorge"
    />
    <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" alt="a bird" group="mountains" />
    <Photo
      src="/thumbnail_mountains.jpg"
      :sizes="[2400]"
      class="photo"
      group="mountains"
      alt="a panorama of mountains"
      multiview
    />

    <PhotoViewer />
    <PhotoMultiViewer />
    <Map class="map" apikey="gfsgdsgds" :callback="mapCallback" />
    <Footer
      style="background-color: aqua"
      background="/thumbnail_mountains.jpg"
      name="Testing"
      :references="[{ name: 'cos', id: 1, links: [{ id: 1, name: 'link 1', url: '/' }] }]"
      ><h3>hello</h3></Footer
    >
  </div>
</template>

<script>
import { PhotoMultiViewer, Navbar, PhotoViewer, Photo, Map, Footer } from "../src/index";

export default {
  components: { Map, Photo, PhotoViewer, PhotoMultiViewer, Navbar, Footer },
  mounted() {
    this.$store.commit("vuepack/addhandler", {
      name: "example",
      handler: () => {
        console.log("hi");
      },
    });
  },
  methods: {
    mapCallback(m) {
      console.log(m);
    },
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

.map {
  width: 100%;
  height: 60%;
  background-color: aqua;
}
</style>
