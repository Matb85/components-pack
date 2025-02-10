import Photo from "./components/Photo.vue";
import Map from "./components/Map.vue";
import PhotoViewer from "./components/viewers/PhotoViewer.vue";
import PhotoMultiViewer from "./components/viewers/PhotoMultiViewer.vue";
import { useVuePackStore } from "./piniaStore";
import Navbar from "./components/nav/Navbar.vue";

// Export the components one by one
export { Map, Photo, PhotoViewer, PhotoMultiViewer, useVuePackStore, Navbar };
