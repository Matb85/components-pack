<div id="app">
  <Photo src="/assets/thumbnail_bird.jpg" sizes="{[720, 1290, 1920, 2400]}" className="photo" multiview />
  <Photo
    src="/assets/thumbnail_gorge.jpg"
    multiview
    sizes="{[720, 1290, 1920, 2400]}"
    className="photo"
    group="mountains" />
  <!--
  <Photo src="/assets/thumbnail_bird.jpg" srcset="/assets/bird.jpg" className="photo" />
  <Photo
    src="/assets/thumbnail_mountains.jpg"
    srcset="/assets/hvga_mountains.jpg"
    className="photo"
    group="mountains" />
    -->
  <PhotoViewer />
  <PhotoMultiViewer />
</div>

<script>
import { init, Photo, PhotoViewer, PhotoMultiViewer } from "./components/index";
import { onMount } from "svelte";

const sizes = {
  thumbnail: "thumbnail_",
  2400: "",
  1920: "fhd_",
  1290: "hd_",
  720: "wvga_",
  480: "hvga_",
};

onMount(() => init(sizes));
</script>
