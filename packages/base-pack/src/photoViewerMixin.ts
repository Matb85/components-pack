interface EnlargeData {
  img: HTMLImageElement;
  rect: DOMRect;
}
interface Position {
  w: string;
  h: string;
}
interface Ambience {
  ref: HTMLImageElement;
  el: HTMLElement;
  getdimensions(aspectR: number): Position;
}

export default {
  mounted(this: Ambience, { img, rect }: EnlargeData) {
    this.ref.style.cssText = `top: ${rect.y}px; left: ${rect.x}px; width: ${img.offsetWidth}px; height: ${img.offsetHeight}px;`;
    this.ref.onload = () => {
      this.el.classList.add("photo-viewer-open");
      const { w, h } = this.getdimensions(img.naturalWidth / img.naturalHeight);
      this.ref.style.setProperty("--enlarged-photo-w", w);
      this.ref.style.setProperty("--enlarged-photo-h", h);
    };
    this.ref.srcset = (img.dataset.fullsrcset as string) || (img.dataset.srcset as string);
  },

  close(img: HTMLImageElement, el: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.remove("photo-viewer-close", "photo-viewer-open");
        img.removeAttribute("style");
        resolve();
      }, 400);
      el.classList.add("photo-viewer-close");
    });
  },

  getdimensions(aspectR: number): Position {
    if (window.innerWidth / window.innerHeight > aspectR) return { w: 95 * aspectR + "vh", h: "95vh" };
    else return { w: "95vw", h: 95 * (1 / aspectR) + "vw" };
  },
};
