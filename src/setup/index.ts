import Photo from "@/components/Photo.vue";
import PhotoViewer from "@/components/PhotoViewer.vue";
import observer from "./observer";

// Export the components one by one
export { Photo, PhotoViewer };

interface Config {
  installComponents?: boolean;
}

// What should happen if the user installs the library as a plugin
function install(Vue: any, config: Config = {}) {
  if (config.installComponents) {
    Vue.component("Photo", Photo);
    Vue.component("PhotoViewer", PhotoViewer);
  }
  Vue.prototype.$mediumPack = { observer };
}

// Export the library as a plugin
export default install;

declare module "vue/types/vue" {
  interface Vue {
    $mediumPack: { observer: IntersectionObserver };
  }
}
