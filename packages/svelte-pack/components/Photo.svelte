<div
  class="MP-photo {className}"
  bind:this={el}
  role="button"
  aria-label="Zdjęcie - kliknij aby powiększyć"
  onclick={enlarge}>
  <img
    bind:this="{img}"
    src="{src}"
    data-srcset="{genSrcset}"
    data-minsrc="{src}"
    sizes="{genSizes}"
    alt="{alt}"
    data-group="{group}"
    data-observerhandler="photo" />
</div>

<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { mutations, photo, type GlobalConfigI } from "@matb85/base-pack";

  interface Props {
     src: string;
     alt?: string;
     sizes: number[];
     prevent?: string[];
     multiview?: boolean;
     group?: string;
     className?: string;
   }

   let {
     src,
     alt = undefined,
     sizes,
     prevent = [],
     multiview = false,
     group = undefined,
     className = "",
   }: Props = $props();

  // DOM bindings
  let img = $state<HTMLImageElement>()!
  let el = $state<HTMLElement>()!;

  /** setup sizes & srcset */
  const GlobalConfig: GlobalConfigI = getContext("svelte-pack-sizes");

  let { genSrcset, genSizes } = $state(photo(src, GlobalConfig.formats, sizes));

  // update srcset on change
  let already = false;

  function updateSrc(_) {
    if (!already) {
      already = true;
      return;
    }
    if (typeof window == "undefined" || !img) return;
    img.classList.remove("loaded");
    img.removeAttribute("srcset");
    img.addEventListener(
      "load",
      () => {
        genSrcset = photo(src, GlobalConfig.formats, sizes).genSrcset;
        dispatch();
      },
      { once: true },
    );
  }

  $effect(() => updateSrc(src));

  function enlarge() {
    if (!img.classList.contains("loaded") || prevent.includes("enlargeOnClick")) return;
    const enlarger = !multiview ? "enlargePhoto" : "enlargeManyPhotos";
    window.dispatchEvent(new CustomEvent(enlarger, { detail: { rect: el.getBoundingClientRect(), img } }));
  }

  // dispatching/adding to the store
  function dispatch(observe = true) {
    if (!img) return;
    if (prevent.includes("addToList") === false) {
      mutations.addPhoto(window.sveltepack, { src, srcset: src, group: group!, alt: alt! });
    }
    if (observe) window.sveltepack.observer.observe(img);
  }

  onMount(dispatch);
</script>
