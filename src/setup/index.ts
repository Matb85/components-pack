import type { VueConstructor } from "vue";
import Photo from "@/components/Photo.vue";
import PhotoViewer from "@/components/PhotoViewer.vue";
// import PhotoMultiViewer from "@/components/PhotoMultiViewer.vue";
// import observer from "./observer";

// Export the components one by one
export { Photo, PhotoViewer };

// What should happen if the user installs the library as a plugin
function install(Vue: VueConstructor) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
}

// Export the library as a plugin
export default install;

//this project does not use vuex, it's only to appease typescript in Photo.vue
//declare module "vue/types/vue" {
//  interface Vue {
//    $store: { state: { observer: IntersectionObserver } };
//  }
//}
