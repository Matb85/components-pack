<template>
  <section ref="root" aria-label="Mapa Google" role="application" data-observerhandler="map"></section>
</template>

<script setup>
import { maputil } from "@matb85/base-pack";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const root = ref(null);

const props = defineProps({ apikey: String, callback: Function });

onMounted(() => {
  store.commit("vuepack/addhandler", {
    name: "map",
    handler: () => maputil(props.apikey, props.callback, root.value),
  });
  store.state.vuepack.observer.observe(root.value);
});
</script>
