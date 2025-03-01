import { createStore, type BasePackStoreI } from "@matb85/base-pack";

declare global {
  interface Window {
    cpStore: BasePackStoreI;
  }
}

function init() {
  window.cpStore = createStore();
}

export { init };
