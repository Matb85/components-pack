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
// bingings to DOM elements
let img, el;

let genSrcset = "",
  genSizes;

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
        const baseSizes = window.sveltepack.sizes;
        console.log(sizes);
        // example: [480, 1920, 2400, integer, integer ...]
        if (Array.isArray(sizes)) {
          for (let i = 0; i < sizes.length; i++) {
            const sizedsrc = src.replace(baseSizes.thumbnail, baseSizes[sizes[i]]);
            console.log(sizedsrc);
            genSrcset += `${sizedsrc} ${sizes[i]}w, `;
          }
        } else {
          // example: {480: 363, 1920: 433, 2400: 1234, imgversion: sizetopick, ... }
          genSizes = "";
          const keys = Object.keys(sizes);
          for (let i = 0; i < keys.length; i++) {
            const curSize = keys[i]; //current size
            const sizedsrc = src.replace(baseSizes.thumbnail, baseSizes[curSize]);
            genSrcset += `${sizedsrc} ${keys[i]}w, `;
            if (i < keys.length - 1) genSizes += `(max-width: ${sizes[curSize]}px) ${curSize}px, `;
          }
          genSizes += "100vw";
        }
        window.dispatchEvent(
          new CustomEvent("sveltepack-addphoto", {
            detail: { src: src, srcset: srcset, ratio: img.naturalWidth / img.naturalHeight, group },
          })
        );
        window.sveltepack.observer.observe(img);
      },
      { once: true }
    );
});
</script>
