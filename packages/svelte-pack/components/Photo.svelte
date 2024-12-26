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

<script>
  import { getContext, onMount } from "svelte";
  import { mutations, photo } from "@matb85/base-pack";

  /**
   * @typedef {Object} Props
   * @property {string} src
   * @property {string} [alt]
   * @property {number[]} [sizes]
   * @property {string[]} [prevent]
   * @property {boolean} [multiview]
   * @property {string} [group]
   * @property {string} [className]
   */

  /** @type {Props} */
  let {
    src,
    alt = undefined,
    sizes = undefined,
    prevent = [],
    multiview = false,
    group = undefined,
    className = "",
  } = $props();

  // DOM bindings
  let img = $state(), el = $state();

  /** setup sizes & srcset
   * @type {import("@matb85/base-pack").StoreDataI}  */
  const GlobalConfig = getContext("svelte-pack-sizes");

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
      mutations.addphoto(window.sveltepack, { src, srcset: src, group, alt });
    }
    if (observe) window.sveltepack.observer.observe(img);
  }

  onMount(dispatch);
</script>
