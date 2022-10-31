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

// get the dimensions of an enlarged image with the correct aspect ratio
function getDimensions(aspectR: number): Position {
  const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2;
  const p = window.innerHeight - offset;
  const q = window.innerWidth - offset;
  if (window.innerWidth / window.innerHeight > aspectR) return { w: p * aspectR + "px", h: p + "px" };
  else return { w: q + "px", h: q * (1 / aspectR) + "px" };
}

let tempResizeListener: () => void;

export default {
  mounted(this: Ambience, { img, rect }: EnlargeDataEvent): Promise<void> {
    return new Promise(resolve => {
      this.ref.style.cssText = `top:${rect.y}px;left:${rect.x}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px;`;
      const onLoadCallback = () => {
        this.el.classList.add("photo-viewer-open");

        tempResizeListener = () => {
          const { w, h } = getDimensions(img.naturalWidth / img.naturalHeight);
          this.ref.style.setProperty("--enlarged-photo-w", w);
          this.ref.style.setProperty("--enlarged-photo-h", h);
        };
        tempResizeListener();
        window.addEventListener("resize", tempResizeListener);
        this.ref.srcset = img.dataset.enlargedsrcset as string;
        resolve();
      };
      if (this.ref.srcset != (img.dataset.enlargedsrcset as string)) {
        this.ref.addEventListener("load", onLoadCallback, { once: true });
        this.ref.srcset = img.dataset.srcset as string; // src has been already loaded for the original image so it's cached
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
        window.removeEventListener("resize", tempResizeListener);
        resolve();
      }, VIEWER_TRANSITION_SPEED);
      el.classList.add("photo-viewer-close");
    });
  },

  // utility for photoMultiViewers
  setupImgs(state: StoreI, img: HTMLImageElement) {
    const photos = state.photolist[img.dataset.group?.split("-")[0] || "rest"];
    let index = 0;
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i] as ExtendedPhoto;
      if (typeof img != "undefined" && photo.srcset == img.dataset.enlargedsrcset) index = i;
    }

    return { photos, index };
  },
};
