import Photo from "./components/Photo.vue";
import Map from "./components/Map.vue";
import PhotoViewer from "./components/Viewers/PhotoViewer.vue";
import PhotoMultiViewer from "./components/Viewers/PhotoMultiViewer.vue";
import { vuepack } from "./vuePackModule";
import Navbar from "./components/nav/Navbar.vue";
import Footer from "./components/nav/Footer.vue";

// Export the components one by one
export { Map, Photo, PhotoViewer, PhotoMultiViewer, vuepack, Navbar, Footer };

// What should happen if the user installs the library as a plugin
function install(Vue) {
  Vue.component("Photo", Photo);
  Vue.component("PhotoViewer", PhotoViewer);
  Vue.component("PhotoMultiViewer", PhotoMultiViewer);
}

// Export the library as a plugin
export default install;
