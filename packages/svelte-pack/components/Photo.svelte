<div
  class="medium-pack-photo {className}"
  bind:this="{el}"
  role="button"
  aria-label="photo - click to enlarge"
  on:click="{enlarge}">
  <img
    bind:this="{img}"
    src="{src}"
    data-src="{src}"
    data-srcset="{genSrcset}"
    data-enlargedsrcset="{enlargedsrcset}"
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

/** setup sizes & srcset
 * @type {import('@matb85/base-pack').StoreDataI}  */
const GlobalConfig = getContext("svelte-pack-sizes");

const settings = photo(src, GlobalConfig.formats, sizes);
let genSrcset = settings.genSrcset,
  genSizes = settings.genSizes;

// setup sizes & srcset when the photo is enlarged
const enlargedsrcset = photo(src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset;
// update srcset on change
function updateSrc() {
  if (typeof window == "undefined" || typeof img == "undefined") return;
  genSrcset = photo(src, GlobalConfig.formats, sizes).genSrcset;
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
  const detail = { src, srcset: enlargedsrcset, group, ratio: img.naturalWidth / img.naturalHeight, alt };
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
