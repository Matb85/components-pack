import type { VueConstructor } from "vue";
import Photo from "./components/Photo.vue";
import { PhotoViewer, PhotoMultiViewer } from "./components/Viewers/index";
// Export the components one by one
export { Photo, PhotoViewer, PhotoMultiViewer };

// What should happen if the user installs the library as a plugin
function install(Vue: VueConstructor) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
}

// Export the library as a plugin
export default install;
