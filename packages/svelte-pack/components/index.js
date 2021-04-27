import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import { VuePackClass, mutations } from "./vuePackModule";
function init() {
  window.sveltepackstate = new VuePackClass();
  window.addEventListener("sveltepack-addphoto", ({ detail }) => mutations.addphoto(window.sveltepackstate, detail));
  window.addEventListener("sveltepack-observe-photo", ({ detail }) => window.sveltepackstate.observer.observe(detail));
}

export { Photo, PhotoViewer, init, VuePackClass, mutations };
