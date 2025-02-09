import Map from "./Map.svelte";
import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import PhotoMultiViewer from "./Viewers/PhotoMultiViewer.svelte";
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
