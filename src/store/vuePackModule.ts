import { Module } from "vuex";

type Handler = (target: any) => void;

class ObserverWrapper {
  async callback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const target = entry.target as HTMLElement;
      this.handlers[target.dataset.observerhandler as string](target);
      observer.unobserve(target);
    });
  }
  observer = new IntersectionObserver(this.callback.bind(this), { rootMargin: "0px", threshold: 0.05 });

  handlers: Record<string, Handler> = {
    photo(img: HTMLImageElement) {
      if (!img.dataset.srcset) img.src = img.dataset.src as string;
      else img.srcset = img.dataset.srcset as string;
      img.addEventListener("load", () => img.classList.add("loaded"));
    },
  };
}

interface AddHandlerForm {
  name: string;
  handler: Handler;
}

export default {
  namespaced: true,
  state: new ObserverWrapper(),
  mutations: {
    addhandler(state: ObserverWrapper, { name, handler }: AddHandlerForm) {
      state.handlers[name] = handler;
    },
    removeHandler(state: ObserverWrapper, name: string) {
      delete state.handlers[name];
    },
  },
} as Module<ObserverWrapper, ObserverWrapper>;
