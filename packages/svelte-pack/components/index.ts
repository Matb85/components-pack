import { createStore, type BasePackStoreI } from "@matb85/base-pack";

declare global {
  interface Window {
    sveltePack: BasePackStoreI;
  }
}

function init() {
  window.sveltePack = createStore();
}

export { init };
