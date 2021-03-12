import { VueConstructor } from "vue";
import Photo from "./src/components/Photo.vue";
import PhotoViewer from "./src/components/PhotoViewer.vue";
import PhotoMultiViewer from "./src/components/PhotoMultiViewer.vue";
import observer from "./observer";

// Export the components one by one
export { Photo, PhotoViewer, PhotoMultiViewer, observer };

interface Config {
  installComponents?: boolean;
}

// What should happen if the user installs the library as a plugin
function install(Vue: VueConstructor, config: Config = {}) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
}

// Export the library as a plugin
export default install;

//this project does not use vuex, it's only to appease typescript in Photo.vue
declare module "vue/types/vue" {
  interface Vue {
    $store: { state: { observer: IntersectionObserver } };
  }
}
