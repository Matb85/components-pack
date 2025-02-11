type Handler = (target: HTMLImageElement) => void;

export interface StorePhotoI {
  src: string;
  srcset: string;
  group: string;
  alt: string;
}

export interface BasePackStoreI {
  callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
  observer: IntersectionObserver;
  handlers: Record<string, Handler>;
  photolist: Record<string, StorePhotoI[]>;
}

export function createStore(): BasePackStoreI {
  /** handler for different needs */
  const handlers: Record<string, Handler> = {
    photo(img: HTMLImageElement) {
      img.addEventListener(
        "load",
        () => {
          if (img.srcset == "") {
            img.addEventListener("load", () => img.classList.add("loaded"), { once: true });
            img.srcset = img.dataset.srcset as string;
          } else img.classList.add("loaded");
        },
        { once: true }
      );
      img.srcset = img.dataset.srcset as string;
    },
  };
  /** IntersectionObserver's logic */
  /** handler for the IntersectionObserver */
  async function callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const target = entry.target as HTMLImageElement;
      const handler = target.dataset.observerhandler;
      if(!handler || !handlers[handler]) {
        console.error(`No handler for ${handler}, available handlers: ${Object.keys(handlers).join(", ")}, DOM element:`, target);
        return;
      }
      handlers[handler](target);
      observer.unobserve(target);
    });
  }
  /** set up a new IntersectionObserver if in the browser */
  const observer = new IntersectionObserver(callback, { rootMargin: "0px", threshold: 0.05 });

  /** list of photos on the page */
  const photolist: Record<string, StorePhotoI[]> = {};
  return { callback, observer, photolist, handlers };
}

export const mutations = {
  addHandler(state: BasePackStoreI, { name, handler }: { name: string; handler: Handler }) {
    state.handlers[name] = handler;
  },
  removeHandler(state: BasePackStoreI, name: string) {
    delete state.handlers[name];
  },
  addPhoto(state: BasePackStoreI, payload: StorePhotoI) {
    const [group, id]: [string, number?] = (payload.group?.split("-") as [string, number?]) || ["rest", undefined];

    if (!state.photolist[group]) state.photolist[group] = [];
    if (!state.photolist[group].map(x => x.src).includes(payload.src)) {
      if (typeof id !== "undefined") state.photolist[group][id] = payload;
      else state.photolist[group].push(payload);
    }
  },
};
