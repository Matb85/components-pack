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
  window.addEventListener(trigger, event => mixin.mounted((event as CustomEvent).detail, img.value!.parentElement!, img.value!, GlobalConfig));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") mixin.close(img.value!.parentElement!, img.value!);
  });
  img.value!.parentElement!.addEventListener("click", () => mixin.close(img.value!.parentElement!, img.value!));
});
</script>
