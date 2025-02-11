<template>
  <div class="MP-viewer" role="button" tabindex="-1" title="Podgląd zdjęcia - kliknij by zamknąć">
    <button title="Zamknij podgląd" id="close-viewer"></button>
    <img ref="img" class="viewed-photo" alt="Powiększone zdjęcie" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { mixin } from "@matb85/base-pack";
import { useVuePackStore } from "../piniaStore";

const store = useVuePackStore();
const GlobalConfig = store.vuepacksizes!;

const trigger = "vuepack-enlargephoto";
const img = useTemplateRef<HTMLImageElement>("img");

onMounted(() => {
  const base = new mixin(img.value!, img.value!.parentElement!, GlobalConfig);
  window.addEventListener(trigger, event => base.mounted((event as CustomEvent).detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") base.close();
  });
  img.value!.parentElement!.addEventListener("click", () => base.close());
});
</script>
