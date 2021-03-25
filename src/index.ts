import type { VueConstructor } from "vue";
import Photo from "./components/Photo.vue";
import PhotoViewer from "./components/PhotoViewer.vue";
import PhotoMultiViewer from "./components/PhotoMultiViewer.vue";
// import observer from "./observer";
// Export the components one by one
export { Photo, PhotoViewer,PhotoMultiViewer };

// What should happen if the user installs the library as a plugin
function install(Vue: VueConstructor) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
}

// Export the library as a plugin
export default install;

