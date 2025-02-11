import type { BasePackStoreI, StorePhotoI } from "./store";
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
  srcsetReady?: boolean;
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

export const mixin = {
  mounted({ img, rect }: EnlargeDataEvent, con: HTMLElement, ref: HTMLImageElement, config: GlobalConfigI): Promise<void> {
    return new Promise(resolve => {
      ref.style.cssText = `top:${rect.y}px;left:${rect.x}px;width:${img.offsetWidth}px;height:${img.offsetHeight}px;`;
      const onLoadCallback = () => {
        con.classList.add("MP-viewer-open");

        tempResizeListener = () => {
          const { w, h } = getDimensions(img.naturalWidth / img.naturalHeight);
          ref.style.setProperty("--enlarged-photo-w", w);
          ref.style.setProperty("--enlarged-photo-h", h);
        };
        tempResizeListener();
        window.addEventListener("resize", tempResizeListener);
        ref.srcset = photo(
          img.dataset.minsrc as string,
          config.formats as BaseSizes,
          config.enlarged
        ).genSrcset;
        resolve();
      };
      ref.addEventListener("load", onLoadCallback, { once: true });
      ref.srcset = img.dataset.srcset as string;
    });
  },
  close(con: HTMLElement, ref: HTMLImageElement): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        con.classList.remove("MP-viewer-close", "MP-viewer-open");
        ref.removeAttribute("style");
        window.removeEventListener("resize", tempResizeListener);
        resolve();
      }, VIEWER_TRANSITION_SPEED);
      con.classList.add("MP-viewer-close");
    });
  },
  // utility for photoMultiViewers
  setupPhotos(state: BasePackStoreI, img: HTMLImageElement, config: GlobalConfigI): { photos: ExtendedPhoto[]; index: number } {
    const photos = state.photolist[img.dataset.group?.split("-")[0] || "rest"];
    let index = 0;
    for (let i = 0; i < photos.length; i++) {
      const p = photos[i] as ExtendedPhoto;
      if (!p.srcsetReady) {
        p.srcset = photo(
          p.srcset as string,
          config.formats,
          config.enlarged,
        ).genSrcset;
        p.srcsetReady = true;
      }
      if (typeof img !== "undefined" && p.src == img.dataset.minsrc) index = i;
    }

    return { photos, index };
  }
};
