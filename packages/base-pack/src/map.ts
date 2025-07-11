import { type BasePackStoreI, mutations } from "./store";

export type MapCallbackT = (map: HTMLElement) => void;

/** overload window's and Google's interface */
declare const google: { maps?: object };
declare global {
  interface Window {
    initMap: MapCallbackT;
  }
}

export function setUpGoogleMap(key: string, callback: MapCallbackT, el: HTMLElement, store: BasePackStoreI) {
  if (typeof google != "undefined" && typeof google.maps != "undefined") return;
  /** Create the script tag, set the appropriate attributes */
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?v=weekly&key=${key}&callback=initMap`;
  script.async = true;

  /** Attach your callback function to the `window` object */
  window.initMap = () => callback(el);

  /** Append the 'script' element to 'head' */
  document.head.appendChild(script);

  mutations.addHandler(store, { name: "map", handler: () => callback(el) });
  store.observer.observe(el);
}
