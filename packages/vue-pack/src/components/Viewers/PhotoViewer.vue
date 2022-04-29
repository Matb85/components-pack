<template>
  <section class="photo-viewer" role="button" aria-label="Podgląd zdjęcia - kliknij by zamknąć" @click="close">
    <img ref="img" class="viewed-photo" alt="Powiększone zdjęcie" />
  </section>
</template>

<script>
import Mixin from "./photoViewerMixin.js";

export default {
  mixins: [Mixin],
  name: "PhotoViewer",
  data: () => ({ trigger: "vuepack-enlargephoto" }),
  mounted() {
    window.addEventListener(this.trigger, data => {
      this.enlargeHandler(data.detail);
    });
  },
};
</script>
