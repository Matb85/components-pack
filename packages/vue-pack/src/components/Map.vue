<template>
  <section aria-label="google maps" role="application" data-observerhandler="map"></section>
</template>

<script>
import { maputil } from "@matb85/base-pack";

export default {
  props: {
    apikey: String,
    callback: Function,
  },
  mounted() {
    this.$store.commit("vuepack/addhandler", {
      name: "map",
      handler: () => maputil(this.apikey, this.callback, this.$el),
    });
    this.$store.state.vuepack.observer.observe(this.$el);
  },
};
</script>
