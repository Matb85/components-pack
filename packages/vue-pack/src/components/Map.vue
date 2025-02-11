<template>
  <section ref="root" aria-label="Mapa Google" role="application" data-observerhandler="map"></section>
</template>

<script setup lang="ts">
import { type MapCallbackT, mapUtil } from "@matb85/base-pack";
import { onMounted, useTemplateRef } from "vue";
import { useVuePackStore } from "../piniaStore";

const store = useVuePackStore();

const root = useTemplateRef<HTMLElement>("root");

const props = defineProps<{
  apikey: string;
  callback: MapCallbackT;
}>();

onMounted(() => {
  store.addHandler({
    name: "map",
    handler: () => mapUtil(props.apikey, props.callback, root.value!),
  });
  store.state!.observer.observe(root.value!);
});
</script>
