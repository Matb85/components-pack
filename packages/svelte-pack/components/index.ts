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

export { Navbar, init };
