
export type MapCallbackT = (map: HTMLElement) => void;

/** overload window's and Google's interface */
declare const google: { maps?: object };
declare global {
  interface Window {
    initMap: MapCallbackT;
  }
}


export default function (key: string, callback: MapCallbackT, map: HTMLElement) {
  if (typeof google != "undefined" && typeof google.maps != "undefined") return;
  /** Create the script tag, set the appropriate attributes */
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?v=weekly&key=${key}&callback=initMap`;
  script.async = true;

  /** Attach your callback function to the `window` object */
  window.initMap = () => callback(map);

  /** Append the 'script' element to 'head' */
  document.head.appendChild(script);
}
