<template>
  <Navbar style="background-color: white">
    <template v-slot:logo><h1>logo</h1></template>
    <p v-for="nav of [1, 2, 3]" :key="nav">nav</p>
  </Navbar>
  <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" />

  <Photo
    :src="src"
    multiview
    :sizes="[720, 1290, 1920, 2400]"
    class="photo"
    group="mountains"
    alt="a photo of the Dunajec Gorge"
  />
  <button @click="() => (src = '/thumbnail_gorge.jpg')">Gorge</button>
  <button @click="() => (src = '/thumbnail_mountains.jpg')">Mountains</button>
  <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" alt="a bird" group="mountains" />
  <Photo
    src="/thumbnail_gorge.jpg"
    :sizes="[2400]"
    class="photo"
    group="mountains"
    alt="a panorama of mountains"
    multiview
  />

  <PhotoViewer />
  <PhotoMultiViewer />
  <Map class="map" apikey="gfsgdsgds" :callback="mapCallback" />
</template>

<script setup>
import { onMounted, ref } from "vue";
import { PhotoMultiViewer, Navbar, PhotoViewer, Photo, Map, useVuePackStore } from "../src";
const store = useVuePackStore();

const src = ref("/thumbnail_mountains.jpg");

const config = {
  formats: {
    thumbnail: "thumbnail_",
    2400: "",
    1920: "fhd_",
    1290: "hd_",
    720: "wvga_",
    480: "hvga_",
  },
  enlarged: [1920, 2400],
};

store.initStore();
store.setSizes(config);

onMounted(() => {
  store.addHandler({ name: "example", handler: () => console.log("hi") });
});

function mapCallback(m) {
  console.log(m);
}
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

.photo {
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
