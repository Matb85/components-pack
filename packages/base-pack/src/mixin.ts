import type { StoreI, StorePhotoI } from "./store";
import photo, { type BaseSizes, Sizes } from "./photo";

export interface GlobalConfigI {
  formats: BaseSizes;
  enlarged: Sizes;
}

interface EnlargeDataEvent {
  img: HTMLImageElement;
  rect: DOMRect;
}

interface Position {
  w: string;
  h: string;
}

interface ExtendedPhoto extends StorePhotoI {
  width?: string;
  height?: string;
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

export default class {
  el: HTMLElement; // the container of the photo viewer
  ref: HTMLImageElement; // the main image that is enlarger
  GlobalConfig: GlobalConfigI;

  constructor(ref: HTMLImageElement, el: HTMLElement, GlobalConfig: GlobalConfigI) {
    this.ref = ref;
    this.el = el;
    this.GlobalConfig = GlobalConfig;
  }

  mounted({ img, rect }: EnlargeDataEvent): Promise<void> {
    return new Promise(resolve => {
      this.ref.style.cssText = `top:${rect.y}px;left:${rect.x}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px;`;
      const onLoadCallback = () => {
        this.el.classList.add("MP-viewer-open");

        tempResizeListener = () => {
          const { w, h } = getDimensions(img.naturalWidth / img.naturalHeight);
          this.ref.style.setProperty("--enlarged-photo-w", w);
          this.ref.style.setProperty("--enlarged-photo-h", h);
        };
        tempResizeListener();
        window.addEventListener("resize", tempResizeListener);
        this.ref.srcset = photo(
          img.dataset.minsrc as string,
          this.GlobalConfig.formats as BaseSizes,
          this.GlobalConfig.enlarged
        ).genSrcset;
        resolve();
      };
      this.ref.addEventListener("load", onLoadCallback, { once: true });
      this.ref.srcset = img.dataset.srcset as string;
    });
  }

  close(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.el.classList.remove("MP-viewer-close", "MP-viewer-open");
        this.ref.removeAttribute("style");
        window.removeEventListener("resize", tempResizeListener);
        resolve();
      }, VIEWER_TRANSITION_SPEED);
      this.el.classList.add("MP-viewer-close");
    });
  }

  // utility for photoMultiViewers
  setupImgs(state: StoreI, img: HTMLImageElement) {
    const photos = state.photolist[img.dataset.group?.split("-")[0] || "rest"];
    let index = 0;
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i] as ExtendedPhoto;
      p.srcset = photo(
        p.srcset as string,
        this.GlobalConfig.formats,
        this.GlobalConfig.enlarged
      ).genSrcset;
      if (typeof img !== "undefined" && p.src == img.dataset.minsrc) index = i;
    }

    return { photos, index };
  }
}
