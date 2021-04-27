export default {
  mounted(ref, el) {
    window.addEventListener("enlargePhoto", ({ detail }) => {
      const { img, rect } = detail;
      ref.style.cssText = `top: ${rect.y}px; left: ${rect.x}px; width: ${img.offsetWidth}px; height: ${img.offsetHeight}px;`;
      ref.onload = () => {
        el.classList.add("photo-viewer-open");
        const { w, h } = this.getdimensions(img.naturalWidth / img.naturalHeight);
        ref.style.setProperty("--enlarged-photo-w", w);
        ref.style.setProperty("--enlarged-photo-h", h);
      };
      ref.srcset = img.dataset.srcset;
    });
  },
  close(img) {
    return new Promise(resolve => {
      setTimeout(() => {
        img.parentElement.classList.remove("photo-viewer-close", "photo-viewer-open");
        img.removeAttribute("style");
        resolve();
      }, 400);
      img.parentElement.classList.add("photo-viewer-close");
    });
  },
  getdimensions(aspectR) {
    if (window.innerWidth / window.innerHeight > aspectR) return { w: 95 * aspectR + "vh", h: "95vh" };
    else return { w: "95vw", h: 95 * (1 / aspectR) + "vw" };
  },
};
