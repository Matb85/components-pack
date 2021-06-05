type Handler = (target: any) => void;

export interface Photo {
  src: string;
  srcset: string;
  ratio: number;
  group: string;
}

export interface Sizes extends Record<number, string> {
  thumbnail: string;
}

export interface StoreI {
  callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
  observer: IntersectionObserver;
  handlers: Record<string, Handler>;
  photolist: Record<string, Photo[]>;
  sizes: Sizes;
}
export function Store(sizes: Sizes): StoreI {
  /** handler for different needs */
  const handlers: Record<string, Handler> = {
    photo(img: HTMLImageElement) {
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.srcset = img.dataset.srcset as string;
    },
  };
  /** IntersectionObserver's logic */
  /** handler for the IntersectionObserver */
  async function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const target = entry.target as HTMLElement;
      handlers[target.dataset.observerhandler as string](target);
      observer.unobserve(target);
    });
  }
  /** set up a new IntersectionObserver if in the browser */
  const observer = new IntersectionObserver(callback, { rootMargin: "0px", threshold: 0.05 });

  /** list of photos on the page */
  const photolist: Record<string, Photo[]> = {};
  return { callback, observer, photolist, handlers, sizes };
}

export const mutations = {
  addhandler(state: StoreI, { name, handler }: { name: string; handler: Handler }) {
    state.handlers[name] = handler;
  },
  removeHandler(state: StoreI, name: string) {
    delete state.handlers[name];
  },
  addphoto(state: StoreI, payload: Photo) {
    const group = payload.group || "rest";
    if (!state.photolist[group]) state.photolist[group] = [];
    if (!state.photolist[group].map(x => x.src).includes(payload.src)) state.photolist[group].push(payload);
  },
};
