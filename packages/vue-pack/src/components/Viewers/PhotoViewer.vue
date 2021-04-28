<template>
  <section class="photo-viewer" @click="close">
    <img ref="img" class="viewed-photo" />
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";
export default {
  mixins: [Mixin],
  name: "PhotoViewer",
  data: () => ({ trigger: "enlargePhoto" }),
};
</script>
