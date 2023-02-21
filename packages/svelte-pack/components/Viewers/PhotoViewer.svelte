<section class="MP-viewer" role="button" aria-label="Podgląd zdjęcia - kliknij by zamknąć" on:click="{close}">
  <img bind:this="{img}" class="viewed-photo" alt="Powiększone zdjęcie" />
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { onMount, getContext } from "svelte";

let img;
const close = () => mixin.close(img, img.parentElement);

/** setup sizes & srcset
 * @type {import('@matb85/base-pack').StoreDataI}  */
const GlobalConfig = getContext("svelte-pack-sizes");

onMount(() => {
  const h = mixin.mounted.bind({ ref: img, el: img.parentElement, GlobalConfig });
  window.addEventListener("enlargePhoto", event => h(event.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") close();
  });
});
</script>
