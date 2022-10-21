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
  getDimensions(aspectR: number): Position;
}

export default {
  mounted(this: Ambience, { img, rect }: EnlargeDataEvent): Promise<void> {
    return new Promise(resolve => {
      this.ref.style.cssText = `top:${rect.y}px;left:${rect.x}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px;`;
      const onLoadCallback = () => {
        this.el.classList.add("photo-viewer-open");
        const { w, h } = this.getDimensions(img.naturalWidth / img.naturalHeight);
        this.ref.style.setProperty("--enlarged-photo-w", w);
        this.ref.style.setProperty("--enlarged-photo-h", h);
        resolve();
      };
      if (this.ref.srcset != (img.dataset.enlargedsrcset as string)) {
        this.ref.onload = onLoadCallback;
        this.ref.srcset = img.dataset.enlargedsrcset as string;
      } else {
        onLoadCallback();
      }
    });
  },

  close(img: HTMLImageElement, el: HTMLElement): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.remove("photo-viewer-close", "photo-viewer-open");
        img.removeAttribute("style");
        resolve();
      }, VIEWER_TRANSITION_SPEED);
      el.classList.add("photo-viewer-close");
    });
  },

  // get the dimensions of an enlarged image with the correct aspect ratio
  getDimensions(aspectR: number): Position {
    if (window.innerWidth / window.innerHeight > aspectR) return { w: 95 * aspectR + "vh", h: "95vh" };
    else return { w: "95vw", h: 95 * (1 / aspectR) + "vw" };
  },
  // utility for photoMultiViewers
  setupImgs(state: StoreI, img: HTMLImageElement) {
    const photos = state.photolist[img.dataset.group?.split("-")[0] || "rest"];
    let index = 0;
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i] as ExtendedPhoto;
      if (typeof img != "undefined") {
        const { w, h } = this.getDimensions(photo.ratio);
        photo.width = w;
        photo.height = h;
        if (photo.srcset == img.dataset.enlargedsrcset) index = i;
      }
    }
    return { photos, index };
  },
};
