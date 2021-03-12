import { VueConstructor } from "vue";
//import {Photo, PhotoViewer, PhotoMultiViewer} from "./src/setup";

export * from "./dist/photoviewer.umd.min.js";

// Export the components one by one
//export { Photo, PhotoViewer, PhotoMultiViewer };

interface Config {
  installComponents?: boolean;
}

// Export the library as a plugin
export default function(Vue: VueConstructor, config?: Config): void;
