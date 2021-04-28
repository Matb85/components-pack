import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import { store } from "@matb85/base-pack";
import "@matb85/base-pack/dist/index.css";
const { VuePackClass, mutations } = store;

function init() {
  window.sveltepackstate = new VuePackClass();
  window.addEventListener("sveltepack-addphoto", ({ detail }) => mutations.addphoto(window.sveltepackstate, detail));
  window.addEventListener("sveltepack-observe-photo", ({ detail }) => window.sveltepackstate.observer.observe(detail));
}

export { Photo, PhotoViewer, init, VuePackClass, mutations };
