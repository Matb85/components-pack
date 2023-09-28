<template>
  <section ref="root" aria-label="Mapa Google" role="application" data-observerhandler="map"></section>
</template>

<script setup>
import { maputil } from "@matb85/base-pack";
import { onMounted, ref } from "vue";
import { useVuePackStore } from "../../src/index";
const store = useVuePackStore();

const root = ref(null);

const props = defineProps({ apikey: String, callback: Function });

onMounted(() => {
  store.addHandler({
    name: "map",
    handler: () => maputil(props.apikey, props.callback, root.value),
  });
  store.observer.observe(root.value);
});
</script>
