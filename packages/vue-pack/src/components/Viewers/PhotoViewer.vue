<template>
  <section ref="root" class="photo-viewer" role="button" @click="close">
    <img ref="img" class="viewed-photo" alt="Powiększone zdjęcie" />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Helpers from "./photoViewerMixin.js";

const trigger = "vuepack-enlargephoto";
const img = ref(null);
const root = ref(null);
function close() {
  Helpers.close(img.value, root.value);
}
onMounted(() => {
  const enlargeHandler = Helpers.getHandler(img.value, root.value);
  window.addEventListener(trigger, data => {
    enlargeHandler(data.detail);
  });
});
</script>
