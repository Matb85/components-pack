<template>
  <section ref="root" class="MP-viewer" role="button" @click="close">
    <img ref="img" class="viewed-photo" alt="Powiększone zdjęcie" />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Helpers from "./photoViewerMixin.js";
import { useStore } from "vuex";

const store = useStore();
const GlobalConfig = store.state.vuepacksizes;

const trigger = "vuepack-enlargephoto";
const img = ref(null);
const root = ref(null);
function close() {
  Helpers.close(img.value, root.value);
}
onMounted(() => {
  const h = Helpers.getHandler(img.value, root.value, GlobalConfig);
  window.addEventListener(trigger, data => h(data.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") close();
  });
});
</script>
