import type { VueConstructor } from "vue";
import Photo from "./components/Photo.vue";
import { PhotoViewer, PhotoMultiViewer } from "./components/Viewers/index";
import { vuepack, VuePackClass } from "./store/vuePackModule";

// Export the components one by one
export { Photo, PhotoViewer, PhotoMultiViewer, vuepack, VuePackClass };

// What should happen if the user installs the library as a plugin
function install(Vue: VueConstructor) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
  Vue.component("PhotoMultiViewer", PhotoMultiViewer);
}

// Export the library as a plugin
export default install;
