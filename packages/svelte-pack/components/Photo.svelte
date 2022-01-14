<div class="medium-pack-photo {className}" bind:this="{el}" on:click="{enlarge}">
  <img
    bind:this="{img}"
    src="{src}"
    data-src="{src}"
    data-srcset="{genSrcset}"
    sizes="{genSizes}"
    alt="{alt}"
    data-group="{group}"
    data-observerhandler="photo" />
  <span class="cross"></span>
</div>

<script>
import { onMount } from "svelte";
import { photo, mutations } from "@matb85/base-pack";
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
let genSrcset = settings.genSrcset,
  genSizes = settings.genSizes;

// update srcset on change
function updateSrc() {
  if (typeof window == "undefined" || typeof img == "undefined") return;
  genSrcset = photo(src, getContext("svelte-pack-sizes"), sizes).genSrcset;
  if (img.classList.contains("loaded")) img.srcset = genSrcset;
}
$: updateSrc() || src;

function enlarge() {
  if (!img.classList.contains("loaded") || prevent.includes("enlargeonclick")) return;
  const enlarger = !multiview ? "enlargePhoto" : "enlargeManyPhotos";
  window.dispatchEvent(new CustomEvent(enlarger, { detail: { rect: el.getBoundingClientRect(), img } }));
}
// dispatching/adding to the store
function dispatch() {
  const detail = { src, srcset: genSrcset, group, ratio: img.naturalWidth / img.naturalHeight, alt };
  mutations.addphoto(window.sveltepack, detail);

  window.sveltepack.observer.observe(img);
}

onMount(() => {
  if (prevent.includes("addtolist")) return;
  if (img.complete) {
    dispatch();
  } else {
    img.addEventListener("load", () => dispatch(), { once: true });
  }
});
</script>
