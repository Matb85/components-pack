<template>
  <section class="MP-viewer" role="button">
    <img ref="img" class="viewed-photo" alt="Powiększone zdjęcie" />
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { mixin } from "@matb85/base-pack";
import { useStore } from "vuex";

const store = useStore();
const GlobalConfig = store.state.vuepacksizes;

const trigger = "vuepack-enlargephoto";
const img = ref(null);

onMounted(() => {
  const base = new mixin(img.value, img.value.parentElement, GlobalConfig);
  window.addEventListener(trigger, data => base.mounted(data.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") base.close();
  });
  img.value.parentElement.addEventListener("click", () => base.close());
});
</script>
