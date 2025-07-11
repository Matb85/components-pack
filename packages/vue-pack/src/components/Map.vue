<template>
  <section ref="root" aria-label="Mapa Google" role="application" data-observerhandler="map"></section>
</template>

<script setup lang="ts">
import { type MapCallbackT, setUpGoogleMap } from "@matb85/base-pack";
import { onMounted, useTemplateRef } from "vue";
import { useVuePackStore } from "../piniaStore";

const store = useVuePackStore();

const root = useTemplateRef<HTMLElement>("root");

const props = defineProps<{
  apikey: string;
  callback: MapCallbackT;
}>();

onMounted(() => {
  setUpGoogleMap(props.apikey, props.callback, root.value!, store.state!);
});
</script>
