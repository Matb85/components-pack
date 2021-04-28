<div id="app">
  <Photo src="/assets/thumbnail_bird.jpg" srcset="/assets/bird.jpg" className="photo" alt="bird photo" />
  <PhotoViewer />
</div>

<script>
import { init, Photo, PhotoViewer } from "./components/index";
import { onMount } from "svelte";

onMount(() => init());
</script>
