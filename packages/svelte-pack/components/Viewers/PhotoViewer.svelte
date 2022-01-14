<section class="photo-viewer" on:click="{close}">
  <img bind:this="{img}" class="viewed-photo" alt="enlarged content" />
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { onMount } from "svelte";

let img;
const close = () => mixin.close(img, img.parentElement);

onMount(() => {
  const hander = mixin.mounted.bind({ ref: img, el: img.parentElement, getdimensions: mixin.getdimensions });
  window.addEventListener("enlargePhoto", event => hander(event.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") close();
  });
});
</script>
