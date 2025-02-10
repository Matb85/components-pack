import Map from "./Map.svelte";
import Photo from "./Photo.svelte";
import PhotoViewer from "./viewers/PhotoViewer.svelte";
import PhotoMultiViewer from "./viewers/PhotoMultiViewer.svelte";
import { Store, type StoreI } from "@matb85/base-pack";
import Navbar from "./nav/Navbar.svelte";

declare global {
  interface Window {
    sveltepack: StoreI;
  }
}

function init() {
  window.sveltepack = Store();
}

export { Map, Photo, PhotoViewer, PhotoMultiViewer, Navbar, init };
