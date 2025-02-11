import { Store, type StoreI } from "@matb85/base-pack";

declare global {
  interface Window {
    sveltePack: StoreI;
  }
}

function init() {
  window.sveltePack = Store();
}

export { init };
