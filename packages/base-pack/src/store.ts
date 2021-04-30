type Handler = (target: any) => void;

export interface Photo {
  src: string;
  srcset: string;
  ratio: number;
  group: string
}

export interface StoreI {
  callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
  observer: IntersectionObserver;
  handlers: Record<string, Handler>
  photolist: Record<string, Photo[]>
}

export class Store implements StoreI{
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
  observer = new IntersectionObserver(this.callback.bind(this), { rootMargin: "0px", threshold: 0.05 });
  /** handler for different needs */
  handlers: Record<string, Handler> = {
    photo(img: HTMLImageElement) {
      img.addEventListener("load", () => img.classList.add("loaded"));
      img.srcset = img.dataset.srcset as string;
    },
  };
  /** list of photos on the page */
  photolist: Record<string, Photo[]> = {}
}

export const mutations = {
  addhandler(state: Store, { name, handler }: { name: string; handler: Handler }) {
    state.handlers[name] = handler;
  },
  removeHandler(state: Store, name: string) {
    delete state.handlers[name];
  },
  addphoto(state: Store, payload: Photo) {
    const group = payload.group || "rest"
    if(!state.photolist[group]) state.photolist[group] = [];
    if (!state.photolist[group].map(x => x.src).includes(payload.src)) state.photolist[group].push(payload);
  },
};
