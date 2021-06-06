/** overload window's interface */
declare global {
  interface Window {
    initMap: (map: HTMLElement) => void;
  }
}

export default function (key: string, callback: (map: HTMLElement) => void, map: HTMLElement) {
  /** Create the script tag, set the appropriate attributes */
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?v=weekly&key=${key}&callback=initMap`;
  script.async = true;

  /** Attach your callback function to the `window` object */
  window.initMap = () => callback(map);

  /** Append the 'script' element to 'head' */
  document.head.appendChild(script);
}
