<template>
  <section class="photo-viewer" role="button" aria-label="Photo viewer - click wherever to close" @click="close">
    <img ref="img" class="viewed-photo" alt="enlarged content" />
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";

export default {
  mixins: [Mixin],
  name: "PhotoViewer",
  data: () => ({ trigger: "enlargePhoto" }),
  mounted() {
    this.$root.$on(this.trigger, (data) => this.enlargeHandler(data));
  },
};
</script>
