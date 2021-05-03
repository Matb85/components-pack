import Photo from "./components/Photo.vue";
import { PhotoViewer, PhotoMultiViewer } from "./components/Viewers/index";
import { vuepack, Store } from "./vuePackModule";
import "@matb85/base-pack/dist/index.css";

// Export the components one by one
export { Photo, PhotoViewer, PhotoMultiViewer, vuepack, Store as VuePackClass };

// What should happen if the user installs the library as a plugin
function install(Vue) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
  Vue.component("PhotoMultiViewer", PhotoMultiViewer);
}

// Export the library as a plugin
export default install;
