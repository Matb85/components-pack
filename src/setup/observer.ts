const observer = new IntersectionObserver(
  async entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio <= 0) return;
      const img: HTMLImageElement = entry.target as HTMLImageElement;
      img.src = img.dataset.src as string;
      console.log(img);
      observer.unobserve(img);
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
      return;
    });
  },
  { rootMargin: "0px", threshold: 0.05 }
);

export default observer;
