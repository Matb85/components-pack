<div class="medium-pack-photo {className}" bind:this="{el}" on:click="{enlarge}">
  <img bind:this="{img}" src="{src}" data-srcset="{srcset}" sizes="{sizes}" alt="{alt}" data-group="{group}" data-observerhandler="photo" />
  <span class="cross"></span>
</div>

<script>
import { onMount } from "svelte";

export let src;
export let alt = undefined;
export let sizes = undefined;
export let srcset;
export let prevent = [];
export let multiview = false;
export let group = undefined;
export let className = "";
let img;
let el;

function enlarge() {
  if (!img.classList.contains("loaded") || prevent.includes("enlargeonclick")) return;
  const enlarger = !multiview ? "enlargePhoto" : "enlargeManyPhotos";
  window.dispatchEvent(new CustomEvent(enlarger, { detail: { rect: el.getBoundingClientRect(), img } }));
}

onMount(() => {
  if (!prevent.includes("addtolist"))
    img.addEventListener(
      "load",
      () => {
        window.dispatchEvent(
          new CustomEvent("sveltepack-addphoto", {
            detail: { src: src, srcset: srcset, ratio: img.naturalWidth / img.naturalHeight, group }
          })
        );
        window.sveltepack.observer.observe(img);
      },
      { once: true }
    );
});
</script>
