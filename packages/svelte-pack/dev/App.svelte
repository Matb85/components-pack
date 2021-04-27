<div id="app">
  <Photo src="/assets/thumbnail_bird.jpg" srcset="/assets/bird.jpg" className="photo" alt="bird photo" />
  <PhotoViewer />
</div>

<script>
import Photo from "./components/Photo.svelte";
import PhotoViewer from "./components/Viewers/PhotoViewer.svelte";
import { init } from "./components/index";
import { onMount } from "svelte";

onMount(() => init());
</script>

<style lang="scss">
#app {
  .photo {
    position: relative;
    &:nth-of-type(1) {
      width: 100%;
      height: 100%;
    }
    &:nth-of-type(2) {
      width: 60%;
    }
    &:nth-of-type(3) {
      width: 20%;
    }
    &:nth-of-type(4) {
      width: 50vw;
      height: 50vw;
    }
  }
}
</style>
