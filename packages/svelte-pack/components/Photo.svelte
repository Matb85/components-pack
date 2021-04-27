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

<style lang="scss" global>
@mixin wh($dim: 100%) {
  width: $dim;
  height: $dim;
}

.medium-pack-photo {
  position: relative;
  overflow: hidden;
  > img {
    display: block;
    object-fit: cover;
    @include wh;
    transition: 0.4s transform, 0.4s filter;
    filter: blur(24px) brightness(100%);
    transform: scale(1.05);
  }
  &:not(.no-hover) {
    cursor: zoom-in;
  }
  > img.loaded {
    filter: blur(0px) brightness(100%);
    transform: scale(1);
  }
  &:not(.no-hover):hover {
    > img.loaded {
      transform: scale(1.05);
      filter: blur(0px) brightness(60%);
    }
    > img.loaded + .cross {
      opacity: 1;
      transform: rotate(180deg);
    }
  }
}
.medium-pack-photo .cross {
  $dim: 8rem;
  $offset: calc(50% - #{$dim/2});
  left: $offset;
  top: $offset;
  @include wh($dim);
  display: block;
  position: absolute;
  opacity: 0;
  transition: transform 0.4s, opacity 0.4s;
  &::before,
  &::after {
    position: absolute;
    left: 50%;
    content: "";
    height: 100%;
    width: 0.4px;
    background-color: white;
  }
  &::after {
    transform: rotate(90deg);
  }
}
</style>

<svelte:options tag="sveltepack-photo" />
