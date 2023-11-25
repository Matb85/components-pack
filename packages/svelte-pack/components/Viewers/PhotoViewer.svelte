<div class="MP-viewer" role="button" tabindex="-1" title="Podgląd zdjęcia - kliknij by zamknąć">
  <button title="Zamknij podgląd" id="close-viewer"></button>
  <img bind:this="{img}" class="viewed-photo" alt="Powiększone zdjęcie" />
</div>

<script>
import { mixin } from "@matb85/base-pack";
import { onMount, getContext } from "svelte";

let img;

/** setup sizes & srcset
 * @type {import('@matb85/base-pack').StoreDataI}  */
const GlobalConfig = getContext("svelte-pack-sizes");

onMount(() => {
  const base = new mixin(img, img.parentElement, GlobalConfig);
  window.addEventListener("enlargePhoto", event => base.mounted(event.detail));

  window.addEventListener("keyup", e => {
    if (e.key == "Escape") base.close();
  });
  img.parentElement.addEventListener("click", () => base.close());
});
</script>
