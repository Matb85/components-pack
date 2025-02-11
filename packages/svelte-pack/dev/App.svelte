<Photo src="/thumbnail_mountains.jpg" sizes={[1290]} className="photo" group="mountains" alt="a portrait of a bird" />

<Photo src={src} sizes={[480, 720]} className="photo" group="mountains" alt="Dunajec Gorge" />
<button onclick={() => (src = '/thumbnail_gorge.jpg')}>Gorge</button>
<button onclick={() => (src = '/thumbnail_mountains.jpg')}>Mountains</button>

<div class="gallery">
  <Photo src="/thumbnail_bird.jpg" sizes={[480, 720]} multiview className="photo" group="gallery-0" />
  <Photo
    src="/thumbnail_mountains.jpg"
    sizes={[480, 720]}
    multiview
    className="photo"
    group="gallery-1"
    alt="Island" />
  <Photo src="/thumbnail_gorge.jpg" sizes={[480, 720]} multiview className="photo" group="gallery-2" alt="gorge" />
  <Photo
    src="/thumbnail_sokolica.jpg"
    sizes={[480, 720]}
    multiview
    className="photo"
    group="gallery-3"
    alt="sokolica" />
</div>
<!---->

<PhotoViewer />
<PhotoMultiViewer />
<Map className="map" apikey="gdsfgdgfds" callback={map => console.log(map)} />

<script module>
  import { init } from "../components/index.js";

  init();
</script>

<script lang="ts">
  import Map from "../components/Map.svelte";
  import Photo from "../components/Photo.svelte";
  import PhotoMultiViewer from "../components/PhotoMultiViewer.svelte";
  import PhotoViewer from "../components/PhotoViewer.svelte";
  import { setContext } from "svelte";
  import type { GlobalConfigI } from "@matb85/base-pack";

  const config: GlobalConfigI = {
    formats: {
      thumbnail: "thumbnail_",
      2400: "",
      1920: "fhd_",
      1290: "hd_",
      720: "wvga_",
      480: "hvga_",
    },
    enlarged: [1920, 2400],
  };

  setContext("svelte-pack-sizes", config);

  let src = $state("/thumbnail_bird.jpg");
</script>
