<template>
  <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" alt="a bird" />

  <Photo
    :src="src"
    multiview
    :sizes="[720, 1290, 1920, 2400]"
    class="photo"
    group="mountains"
    alt="a panorama of mountains"
  />
  <button @click="() => (src = '/thumbnail_gorge.jpg')">Gorge</button>
  <button @click="() => (src = '/thumbnail_mountains.jpg')">Mountains</button>
  <Photo src="/thumbnail_bird.jpg" :sizes="{ 2400: 800, 480: 1000 }" class="photo" alt="a bird" group="mountains" />
  <Photo
    src="/thumbnail_gorge.jpg"
    :sizes="[2400]"
    class="photo"
    group="mountains"
    alt="a photo of the Dunajec Gorge"
    multiview
  />

  <PhotoViewer />
  <PhotoMultiViewer />
  <Map class="map" apikey="gfsgdsgds" :callback="mapCallback" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useVuePackStore } from "../src";
import PhotoViewer from "../src/components/PhotoViewer.vue";
import PhotoMultiViewer from "../src/components/PhotoMultiViewer.vue";
import Photo from "../src/components/Photo.vue";
import Map from "../src/components/Map.vue";

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

function mapCallback(m: HTMLElement) {
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
