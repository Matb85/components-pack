const observer = new IntersectionObserver(
  async entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const img: HTMLImageElement = entry.target as HTMLImageElement;
      img.src = img.dataset.src as string;
      observer.unobserve(img);
      img.addEventListener("load", () => {
        img.classList.add("revealed");
      });
      return;
    });
  },
  { rootMargin: "0px", threshold: 0.2 }
);

export default observer;
