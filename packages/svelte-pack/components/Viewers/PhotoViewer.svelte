<section class="MP-viewer" role="button" aria-label="Podgląd zdjęcia - kliknij by zamknąć" on:click="{close}">
  <img bind:this="{img}" class="viewed-photo" alt="Powiększone zdjęcie" />
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { onMount } from "svelte";

let img;
const close = () => mixin.close(img, img.parentElement);

onMount(() => {
  const handler = mixin.mounted.bind({ ref: img, el: img.parentElement, getDimensions: mixin.getDimensions });
  window.addEventListener("enlargePhoto", event => handler(event.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") close();
  });
});
</script>
