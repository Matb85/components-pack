<div class="medium-pack-photo {className}" bind:this="{el}" on:click="{enlarge}">
  <img bind:this="{img}" src="{src}" data-srcset="{srcset}" sizes="{sizes}" alt="{alt}" data-observerhandler="photo" />
  <span class="cross"></span>
</div>

<script>
import { onMount } from "svelte";

export let src;
export let alt;
export let sizes = undefined;
export let srcset;
export let dontenlargeonclick = undefined;
export let dontaddtolist = undefined;
export let multiview = undefined;
export let className = "";
let img;
let el;
function enlarge() {
  if (!img.classList.contains("loaded") || typeof dontenlargeonclick !== "undefined") return;
  const enlarger = typeof multiview === "undefined" ? "enlargePhoto" : "enlargeManyPhotos";
  window.dispatchEvent(new CustomEvent(enlarger, { detail: { rect: el.getBoundingClientRect(), img } }));
}

onMount(() => {
  img.addEventListener(
    "load",
    () => {
      window.dispatchEvent(
        new CustomEvent("sveltepack-addphoto", {
          detail: { src: src, srcset: srcset, ratio: img.naturalWidth / img.naturalHeight }
        })
      );
      window.dispatchEvent(new CustomEvent("sveltepack-observe-photo", { detail: img }));
    },
    { once: true }
  );
});
</script>
