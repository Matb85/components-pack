import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import PhotoMultiViewer from "./Viewers/PhotoMultiViewer.svelte";
import { store } from "@matb85/base-pack";
import "@matb85/base-pack/dist/index.css";

const { Store, mutations } = store;

function init(sizes) {
  window.sveltepack = Store(sizes);
  window.addEventListener("sveltepack-addphoto", ({ detail }) => mutations.addphoto(window.sveltepack, detail));
}

export { Photo, PhotoViewer, PhotoMultiViewer, init, Store, mutations };
