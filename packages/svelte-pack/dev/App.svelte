<Navbar className="bg-white">
  <h1 slot="logo">logo</h1>
  {#each [1, 2, 3] as id}
    <p>nav{id}</p>
  {/each}
</Navbar>
<Photo
  src="/thumbnail_mountains.jpg"
  sizes="{[720, 1290, 1920, 2400]}"
  className="photo"
  group="mountains"
  multiview
  alt="a portrait of a bird" />
<Photo
  src="/thumbnail_gorge.jpg"
  multiview
  sizes="{[480, 720]}"
  className="photo"
  group="mountains"
  alt="a photo of the Dunajec Gorge" />

<Photo src="/thumbnail_bird.jpg" sizes="{[480, 720]}" className="photo" group="mountains" />
<Photo
  src="/thumbnail_mountains.jpg"
  sizes="{[480, 720]}"
  className="photo"
  group="mountains"
  alt="a panorama of mountains" />

<!---->

<PhotoViewer />
<PhotoMultiViewer />
<Map className="map" apikey="gdsfgdgfds" callback="{map => console.log(map)}" />

<script context="module">
init();
</script>

<script>
import { Map, Photo, PhotoViewer, PhotoMultiViewer, Navbar, init } from "../components/index";
import { setContext } from "svelte";
/** config
 * @type {import('@matb85/base-pack').StoreDataI}  */
const config = {
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
</script>
