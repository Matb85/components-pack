<div id="app">
  <Photo src="/assets/thumbnail_bird.jpg" srcset="/assets/bird.jpg" className="photo" alt="bird photo" multiview />
  <Photo
    src="/assets/thumbnail_gorge.jpg"
    multiview
    srcset="/assets/hvga_gorge.jpg 720w, /assets/hd_gorge.jpg 1280w, /assets/fhd_gorge.jpg 1920w, /assets/gorge.jpg 2400w"
    className="photo" />
  <Photo src="/assets/thumbnail_bird.jpg" srcset="/assets/bird.jpg" className="photo" />
  <Photo src="/assets/thumbnail_mountains.jpg" srcset="/assets/hvga_mountains.jpg" className="photo" />
  <PhotoViewer />
  <PhotoMultiViewer />
</div>

<script>
import { init, Photo, PhotoViewer, PhotoMultiViewer } from "./components/index";
import { onMount } from "svelte";

onMount(() => init());
</script>
