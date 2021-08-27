import Map from "./Map.svelte";
import Photo from "./Photo.svelte";
import PhotoViewer from "./Viewers/PhotoViewer.svelte";
import PhotoMultiViewer from "./Viewers/PhotoMultiViewer.svelte";
import { Store } from "@matb85/base-pack";
import Navbar from "./nav/Navbar.svelte";
import Footer from "./nav/Footer.svelte";

function init() {
  window.sveltepack = Store();
}

export { Map, Photo, PhotoViewer, PhotoMultiViewer, init, Navbar, Footer };
