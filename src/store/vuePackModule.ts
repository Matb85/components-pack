import { Module } from "vuex";

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  const observer = new IntersectionObserver(
    async entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio <= 0) return;
        const img = entry.target as HTMLImageElement;
        if (!img.dataset.srcset) img.src = img.dataset.src as string;
        else img.srcset = img.dataset.srcset as string;

        observer.unobserve(img);
        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });
        return;
      });
    },
    { rootMargin: "0px", threshold: 0.05 }
  );
  return observer;
}

interface StateI {
  observer: IntersectionObserver | null;
}

export default {
  namespaced: true,
  state: {
    observer: getObserver(),
  },
} as Module<StateI, StateI>;
