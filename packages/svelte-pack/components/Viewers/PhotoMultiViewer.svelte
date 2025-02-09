<section title="Podgląd wielu zdjęć" bind:this={el} class="MP-multi-viewer MP-viewer MS-wrapper">
  <div aria-hidden="true" class="first-slide">
    <img bind:this={image} class="viewed-photo" alt="main" />
  </div>
  <div class="photo-slider MS-con" id="photo-slider">
    {#each imgs as img}
      <img
        class="other-slide MS-lazy"
        src={img.src}
        data-srcset={img.srcset}
        alt={img.alt || 'zdjęcie bez podpisu'} data-observerhandler="photo" />
    {/each}
  </div>
  <!-- navigation -->
  <button title="Poprzednie zdjęcie" id="multi-viewer-prev" onclick={() => slider?.slidePrev()}>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
      ><path d={svgPath}></path>
    </svg>
  </button>
  <button title="Kolejne zdjęcie" id="multi-viewer-next" onclick={() => slider?.slideNext()}>
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
      ><path d={svgPath}></path></svg>
  </button>
  <div class="MP-viewer_navbar">
    <p>
      {#if slider !== false}{Math.abs(counter) + 1}/{imgs.length}
        {imgs[Math.abs(counter)] && imgs[Math.abs(counter)].alt ? " | " + imgs[Math.abs(counter)].alt : ""}
      {/if}
    </p>
    <button aria-label="Zamknij podgląd" title="Zamknij podgląd" onclick={closeViewer} id="close-multi-viewer"
    ></button>
  </div>
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { NoLoop, swipeHandler, lazyLoading } from "modular-slider";
import { onMount, getContext } from "svelte";

/** setup sizes & srcset
 * @type {import('@matb85/base-pack').StoreDataI}  */
const GlobalConfig = getContext("svelte-pack-sizes");

let image = $state();
let el = $state();
const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";
let imgs = $state([]);
/** slider
 * @type {import('modular-slider').NoLoop | false}  */
let slider = $state(false);
let counter = $state();

function onKeyUp(e) {
  if (!slider) return;
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowLeft") slider.slidePrev();
  else if (e.key === "ArrowRight") slider.slideNext();
}
let base;
onMount(() => {
  base = new mixin(image, el, GlobalConfig);
  window.addEventListener("enlargeManyPhotos", async ({ detail }) => {
    window.addEventListener("keyup", onKeyUp);

    const result = base.setupImgs(window.sveltepack, detail.img);

    imgs = result.photos;
    await base.mounted(detail);
    slider = new NoLoop({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [swipeHandler()],
    });

    const chosen = slider.container.children[result.index];
    window.sveltepack.handlers.photo(chosen);

    slider.container.querySelectorAll(".MS-lazy").forEach(img => window.sveltepack.observer.observe(img));

    image.addEventListener("animationend", () => (image.parentElement.style.display = "none"), { once: true });
    counter = slider.counter;
    Object.defineProperty(slider, "counter", {
      get: () => counter,
      set: val => (counter = val),
    });
    setTimeout(() => slider.goTo(result.index), 0);
  });
});

async function closeViewer() {
  await base.close(image, el);
  imgs = [];
  image.parentElement.style.display = "block";
  if (!slider) return;
  slider.goTo(0);
  slider.destroy();
  slider = false;
  window.removeEventListener("keyup", onKeyUp);
}
</script>
