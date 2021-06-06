<div id="app">
  <Photo
    src="/assets/thumbnail_bird.jpg"
    sizes="{[720, 1290, 1920, 2400]}"
    className="photo"
    group="mountains"
    multiview />
  <Photo
    src="/assets/thumbnail_gorge.jpg"
    multiview
    sizes="{[720, 1290, 1920, 2400]}"
    className="photo"
    group="mountains" />

  <Photo src="/assets/thumbnail_bird.jpg" sizes="{[480, 720]}" className="photo" group="mountains" />
  <Photo src="/assets/thumbnail_mountains.jpg" sizes="{[480, 720]}" className="photo" group="mountains" />

  <PhotoViewer />
  <PhotoMultiViewer />
  <Map className="map" key="gdsfgdgfds" callback="{map => console.log(map)}" />
</div>

<script context="module">
init();
</script>

<script>
import { init, Map, Photo, PhotoViewer, PhotoMultiViewer } from "./components/index";
import { setContext } from "svelte";

setContext("svelte-pack-sizes", {
  thumbnail: "thumbnail_",
  2400: "",
  1920: "fhd_",
  1290: "hd_",
  720: "wvga_",
  480: "hvga_",
});
</script>
