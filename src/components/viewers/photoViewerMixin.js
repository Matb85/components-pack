export default {
  mounted() {
    this.$root.$on(this.trigger, ({ img, rect }) => {
      const ref = this.$refs.img;
      ref.style.cssText = `top: ${rect.y}px; left: ${rect.x}px; width: ${img.offsetWidth}px; height: ${img.offsetHeight}px;`;
      ref.onload = () => {
        this.$el.classList.add("photo-viewer-open");
        const aspectR = img.naturalWidth / img.naturalHeight;
        if (window.innerWidth / window.innerHeight > aspectR) {
          ref.style.setProperty("--enlarged-photo-w", 95 * aspectR + "vh");
          ref.style.setProperty("--enlarged-photo-h", "95vh");
        } else {
          ref.style.setProperty("--enlarged-photo-w", "95vw");
          ref.style.setProperty("--enlarged-photo-h", 95 * (1 / aspectR) + "vw");
        }
      };
      ref.srcset = img.dataset.srcset;
    });
  },
  methods: {
    close() {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log("transitionend");
          this.$el.classList.remove("photo-viewer-close", "photo-viewer-open");
          this.$refs.img.removeAttribute("style");
          resolve();
        }, process.env.VUE_APP_TRANSITION_DUR);
        this.$el.classList.add("photo-viewer-close");
      });
    },
  },
};
