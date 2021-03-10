import { Component, Vue } from "vue-property-decorator";

interface Position {
  x: number;
  y: number;
}

@Component
export default class PhotoViewerMixin extends Vue {
  $refs!: {
    img: HTMLImageElement;
  };
  $el!: HTMLElement;
  trigger: string;

  mounted() {
    this.$root.$on(this.trigger, (img: HTMLImageElement) => {
      console.log(this.trigger);
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
    return new Promise<void>(resolve => {
      this.$el.addEventListener(
        "transitionend",
        () => {
          console.log("transitionend");
          this.$el.classList.remove("photo-viewer-close", "photo-viewer-open");
          this.$refs.img.style.cssText = "";
          resolve();
        },
        { once: true }
      );
      this.$el.classList.add("photo-viewer-close");
    });
  }
}
