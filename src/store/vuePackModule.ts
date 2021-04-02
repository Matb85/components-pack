import { Module } from "vuex";

class ObserverWrapper {
  async handler(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      console.log(entry.target);
      const img = entry.target as HTMLImageElement;
      if (!img.dataset.srcset) img.src = img.dataset.src as string;
      else img.srcset = img.dataset.srcset as string;

      observer.unobserve(img);
      img.addEventListener("load", () => img.classList.add("loaded"));
    });
  }
  observer = new IntersectionObserver(this.handler.bind(this), { rootMargin: "0px", threshold: 0.05 });
}

export default {
  namespaced: true,
  state: new ObserverWrapper(),
} as Module<{}, {}>;
