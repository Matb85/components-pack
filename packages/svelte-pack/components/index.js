import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import PhotoMultiViewer from "./Viewers/PhotoMultiViewer.svelte";
import { store } from "@matb85/base-pack";
import "@matb85/base-pack/dist/index.css";
import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";
const Slider = setup(Slidehandler, Noloop);
export { lazyloading, buttons, Slider };

const { VuePackClass, mutations } = store;

function init() {
  window.sveltepackstate = new VuePackClass();
  window.addEventListener("sveltepack-addphoto", ({ detail }) => mutations.addphoto(window.sveltepackstate, detail));
}

export { Photo, PhotoViewer, init, VuePackClass, mutations, PhotoMultiViewer };
