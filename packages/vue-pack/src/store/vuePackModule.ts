import { Module } from "vuex";

type Handler = (target: any) => void;
interface Photo {
  src: string;
  srcset: string;
  ratio: string;
}

export class VuePackClass {
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
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.srcset = img.dataset.srcset as string;
    },
  };
  /** list of photos on the page */
  photolist: Photo[] = [];
}

export const vuepack = {
  namespaced: true,
  state: new VuePackClass(),
  mutations: {
    addhandler(state: VuePackClass, { name, handler }: { name: string; handler: Handler }) {
      state.handlers[name] = handler;
    },
    removeHandler(state: VuePackClass, name: string) {
      delete state.handlers[name];
    },
    addphoto(state: VuePackClass, payload: Photo) {
      if (!state.photolist.map(x => x.src).includes(payload.src)) state.photolist.push(payload);
    },
  },
} as Module<VuePackClass, VuePackClass>;
