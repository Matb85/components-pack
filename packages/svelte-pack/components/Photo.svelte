<div class="medium-pack-photo {className}" bind:this="{el}" on:click="{enlarge}">
  <img
    bind:this="{img}"
    src="{src}"
    data-srcset="{genSrcset}"
    sizes="{genSizes}"
    alt="{alt}"
    data-group="{group}"
    data-observerhandler="photo" />
  <span class="cross"></span>
</div>

<script context="module">
if (typeof window != "undefined") window.sveltepack = Store();
</script>

<script>
import { onMount } from "svelte";
import { photo, mutations, Store } from "@matb85/base-pack";
import { getContext } from "svelte";

export let src;
export let alt = undefined;
export let sizes = undefined;
export let prevent = [];
export let multiview = false;
export let group = undefined;
export let className = "";
// bingings to DOM elements
let img, el;

// setup sizes & srcset
const settings = photo(src, getContext("svelte-pack-sizes"), sizes);
const genSrcset = settings.genSrcset,
  genSizes = settings.genSizes;

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
        const detail = { src, srcset: genSrcset, group, ratio: img.naturalWidth / img.naturalHeight };
        mutations.addphoto(window.sveltepack, detail);

        window.sveltepack.observer.observe(img);
      },
      { once: true }
    );
});
</script>
