import type { StoreI, Photo } from "./store";

interface EnlargeDataEvent {
  img: HTMLImageElement;
  rect: DOMRect;
}

interface Position {
  w: string;
  h: string;
}

interface ExtendedPhoto extends Photo {
  width?: string;
  height?: string;
}

interface Ambience {
  ref: HTMLImageElement;
  el: HTMLElement;
  getdimensions(aspectR: number): Position;
}

export default {
  mounted(this: Ambience, { img, rect }: EnlargeDataEvent): Promise<void> {
    return new Promise(resolve => {
      this.ref.style.cssText = `top: ${rect.y}px; left: ${rect.x}px; width: ${img.offsetWidth}px; height: ${img.offsetHeight}px;`;
      const onloadcallback = () => {
        this.el.classList.add("photo-viewer-open");
        const { w, h } = this.getdimensions(img.naturalWidth / img.naturalHeight);
        this.ref.style.setProperty("--enlarged-photo-w", w);
        this.ref.style.setProperty("--enlarged-photo-h", h);
        resolve();
      };
      if (this.ref.srcset != (img.dataset.enlargedsrcset as string)) {
        this.ref.onload = onloadcallback;
        this.ref.srcset = img.dataset.enlargedsrcset as string;
      } else {
        onloadcallback();
      }
    });
  },

  close(img: HTMLImageElement, el: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.remove("photo-viewer-close", "photo-viewer-open");
        img.removeAttribute("style");
        resolve();
      }, process.env.VIEWER_TRANSITION_SPEED);
      el.classList.add("photo-viewer-close");
    });
  },

  getdimensions(aspectR: number): Position {
    if (window.innerWidth / window.innerHeight > aspectR) return { w: 95 * aspectR + "vh", h: "95vh" };
    else return { w: "95vw", h: 95 * (1 / aspectR) + "vw" };
  },
  // utility for photoMultiViewers
  setupimgs(state: StoreI, img: HTMLImageElement) {
    const photos = state.photolist[img.dataset.group || "rest"];
    let index = 0;
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i] as ExtendedPhoto;
      if (typeof img != "undefined") {
        const { w, h } = this.getdimensions(photo.ratio);
        photo.width = w;
        photo.height = h;
        if (photo.src == img.dataset.src) index = i;
      }
    }
    return { photos, index };
  },
};
