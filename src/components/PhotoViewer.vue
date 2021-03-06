<template>
  <section class="photo-viewer" @click="close">
    <img ref="img" class="viewed-photo" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
interface Position {
  x: number;
  y: number;
}

@Component
export default class PhotoViewer extends Vue {
  $refs!: {
    img: HTMLImageElement;
  };
  $el!: HTMLElement;

  mounted() {
    this.$root.$on("enlargePhoto", (img: HTMLImageElement) => {
      // console.dir(img);console.log(img.x, img.y, img.offsetHeight, img.offsetWidth);
      const root = document.documentElement;
      const { x, y } = this.getPosition(img);
      const ref = this.$refs.img;
      ref.style.cssText = `
        top: ${y - root.scrollTop}px;
        left: ${x}px;
        width: ${img.offsetWidth}px;
        height: ${img.offsetHeight}px;
      `;
      ref.onload = () => {
        this.$el.classList.add("photo-viewer-open");
        const aspectR = img.naturalWidth / img.naturalHeight;
        if (window.innerWidth / window.innerHeight > aspectR) {
          this.$el.style.setProperty("--enlarged-photo-w", 90 * aspectR + "vh");
          this.$el.style.setProperty("--enlarged-photo-h", "90vh");
        } else {
          this.$el.style.setProperty("--enlarged-photo-w", "95vw");
          this.$el.style.setProperty("--enlarged-photo-h", 95 * (1 / aspectR) + "vw");
        }
      };
      ref.src = img.src;
    });
  }

  getPosition(element: HTMLElement): Position {
    let xPosition = 0;
    let yPosition = 0;
    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent as HTMLElement;
    }
    return { x: xPosition, y: yPosition };
  }
  close() {
    this.$el.addEventListener(
      "transitionend",
      () => {
        this.$el.classList.remove("photo-viewer-close", "photo-viewer-open");
      },
      { once: true }
    );
    this.$el.classList.add("photo-viewer-close");
  }
}
</script>

<style lang="scss">
.photo-viewer {
  background-color: rgba(255, 255, 255, 0);
  transition-property: opacity, background-color;
  transition-duration: 0.6s;
  top: 200vh;

  position: fixed;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  > .viewed-photo {
    object-fit: cover;
    position: relative;
    transform: scale(1.05);
  }
}
html .photo-viewer-close {
  opacity: 0;
}
.photo-viewer-open {
  top: 0;
  background-color: white;
  > .viewed-photo {
    animation: 0.6s place-img forwards;
  }
}

@keyframes place-img {
  to {
    $h: var(--enlarged-photo-h);
    $w: var(--enlarged-photo-w);
    transform: scale(1);

    width: $w;
    height: $h;
    top: calc((100vh - #{$h}) / 2);
    left: calc((100% - #{$w}) / 2);
  }
}
</style>
