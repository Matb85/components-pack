import { Store, type StoreI } from "@matb85/base-pack";

declare global {
  interface Window {
    sveltepack: StoreI;
  }
}

function init() {
  window.sveltepack = Store();
}

export { init };
