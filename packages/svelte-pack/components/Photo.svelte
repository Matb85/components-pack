<div
  class="medium-pack-photo {className}"
  bind:this="{el}"
  role="button"
  aria-label="Zdjęcie - kliknij aby powiększyć"
  on:click="{enlarge}">
  <img
    bind:this="{img}"
    src="{src}"
    data-srcset="{genSrcset}"
    data-enlargedsrcset="{enlargedsrcset}"
    sizes="{genSizes}"
    alt="{alt}"
    data-group="{group}"
    data-observerhandler="photo" />
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

let { genSrcset, genSizes } = photo(src, GlobalConfig.formats, sizes);

// setup sizes & srcset when the photo is enlarged
let enlargedsrcset = photo(src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset;
// update srcset on change
function updateSrc() {
  if (typeof window == "undefined" || typeof img == "undefined") return;
  img.classList.remove("loaded");
  img.removeAttribute("srcset");
  img.addEventListener(
    "load",
    () => {
      enlargedsrcset = photo(src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset;
      genSrcset = photo(src, GlobalConfig.formats, sizes).genSrcset;
      dispatch();
    },
    { once: true }
  );
}
$: src, updateSrc();

function enlarge() {
  if (!img.classList.contains("loaded") || prevent.includes("enlargeonclick")) return;
  const enlarger = !multiview ? "enlargePhoto" : "enlargeManyPhotos";
  window.dispatchEvent(new CustomEvent(enlarger, { detail: { rect: el.getBoundingClientRect(), img } }));
}
// dispatching/adding to the store
function dispatch(observe = true) {
  if (img === null) return;
  if (prevent.includes("addtolist") === false) {
    mutations.addphoto(window.sveltepack, { src, srcset: enlargedsrcset, group, alt });
  }
  if (observe) window.sveltepack.observer.observe(img);
}

onMount(dispatch);
</script>
