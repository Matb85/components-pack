export default {
  mounted() {
    this.$root.$on(this.trigger, img => {
      // console.dir(img);console.log(img.x, img.y, img.offsetHeight, img.offsetWidth);
      const root = document.documentElement;
      const { x, y } = this.getPosition(img);
      const ref = this.$refs.img;
      console.log(ref);
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
          ref.style.setProperty("--enlarged-photo-w", 95 * aspectR + "vh");
          ref.style.setProperty("--enlarged-photo-h", "95vh");
        } else {
          ref.style.setProperty("--enlarged-photo-w", "95vw");
          ref.style.setProperty("--enlarged-photo-h", 95 * (1 / aspectR) + "vw");
        }
      };
      if (!img.dataset.srcset) ref.src = img.src;
      else ref.srcset = img.dataset.srcset;
    });
  },
  methods: {
    getPosition(element) {
      let xPosition = 0;
      let yPosition = 0;
      while (element) {
        xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
        yPosition += element.offsetTop - element.scrollTop + element.clientTop;
        element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    },
    close() {
      return new Promise(resolve => {
        this.$el.addEventListener(
          "transitionend",
          () => {
            console.log("transitionend");
            this.$el.classList.remove("photo-viewer-close", "photo-viewer-open");
            this.$refs.img.removeAttribute("style");
            resolve();
          },
          { once: true }
        );
        this.$el.classList.add("photo-viewer-close");
      });
    },
  },
};
