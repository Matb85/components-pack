import { Module } from "vuex";

type Handler = (target: any) => void;
interface Photo {
  src: string;
  srcset: string;
}
class VuePack {
  /** IntersectionObserver's logic */
  /** handler for the IntersectionObserver */
  async callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const target = entry.target as HTMLElement;
      this.handlers[target.dataset.observerhandler as string](target);
      observer.unobserve(target);
    });
  }
  /** set up a new IntersectionObserver if in the browser */
  observer =
    typeof window === "undefined"
      ? {}
      : new IntersectionObserver(this.callback.bind(this), { rootMargin: "0px", threshold: 0.05 });
  /** handler for different needs */
  handlers: Record<string, Handler> = {
    photo(img: HTMLImageElement) {
      if (!img.dataset.srcset) img.src = img.dataset.src as string;
      else img.srcset = img.dataset.srcset as string;
      img.addEventListener("load", () => img.classList.add("loaded"));
    },
  };
  /** list of photos on the page */
  photolist: Photo[] = [];
}

export const vuepack = {
  namespaced: true,
  state: new VuePack(),
  mutations: {
    addhandler(state: VuePack, { name, handler }: { name: string; handler: Handler }) {
      state.handlers[name] = handler;
    },
    removeHandler(state: VuePack, name: string) {
      delete state.handlers[name];
    },
    addphoto(state: VuePack, payload: Photo) {
      if (!state.photolist.map(x => x.src).includes(payload.src)) state.photolist.push(payload);
    },
  },
} as Module<VuePack, VuePack>;
