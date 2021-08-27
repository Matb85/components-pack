<Navbar className="bg-white">
  <h1 slot="logo">logo</h1>
  {#each [1, 2, 3] as id}
    <p>nav{id}</p>
  {/each}
</Navbar>
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
  <Map className="map" apikey="gdsfgdgfds" callback="{map => console.log(map)}" />
  <Footer
    className="bg-aqua"
    background="/assets/thumbnail_bird.jpg"
    name="Testing"
    references="{[{ name: 'cos', id: 1, links: [{ id: 1, name: 'link 1', url: '/' }] }]}"><h3>hello</h3></Footer>
</div>

<script context="module">
init();
</script>

<script>
import { init, Map, Photo, PhotoViewer, PhotoMultiViewer, Navbar, Footer } from "./components/index";
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
