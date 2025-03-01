<section title="Podgląd wielu zdjęć" bind:this={con} class="MP-multi-viewer MP-viewer MS-wrapper">
  <div aria-hidden="true" class="first-slide">
    <img bind:this={ref} class="viewed-photo" alt="main" />
  </div>
  <div class="photo-slider MS-con" id="photo-slider">
    {#each photos as img}
      <img
        class="other-slide MS-lazy"
        src={img.src}
        data-srcset={img.srcset}
        alt={img.alt || 'zdjęcie bez podpisu'}
        data-observerhandler="photo" />
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
      {#if slider}{Math.abs(counter) + 1}/{photos.length}
        {photos[Math.abs(counter)] && photos[Math.abs(counter)].alt ? " | " + photos[Math.abs(counter)].alt : ""}
      {/if}
    </p>
    <button aria-label="Zamknij podgląd" title="Zamknij podgląd" onclick={closeViewer} id="close-multi-viewer"
    ></button>
  </div>
</section>

<script lang="ts">
import { mixin, type GlobalConfigI } from "@matb85/base-pack";
import { NoLoop, swipeHandler } from "modular-slider";
import { onMount, getContext } from "svelte";

/** setup sizes & srcset */
const GlobalConfig: GlobalConfigI = getContext("svelte-pack-sizes");

let con = $state<HTMLElement>()!;
let ref = $state<HTMLImageElement>()!;

const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";

let photos = $state<any[]>([]);
let slider: NoLoop | undefined = $state(undefined);
let counter = $state(0);

onMount(() => {
  window.addEventListener("enlargeManyPhotos", async (e) => {
    const { detail } = e as CustomEvent;
    window.addEventListener("keyup", onKeyUp);

    const result = mixin.setupPhotos(window.cpStore, detail.img, GlobalConfig);
    photos = result.photos;
    await mixin.mounted(detail, con, ref, GlobalConfig);

    slider = new NoLoop({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [swipeHandler()],
    });

    const chosen = slider.container.children[result.index];
    window.cpStore.handlers.photo(chosen as HTMLImageElement);

   const els = slider.container.querySelectorAll(".MS-lazy") as NodeListOf<HTMLImageElement>;
    els.forEach(img => window.cpStore.observer.observe(img));

    ref.addEventListener("animationend", () => (ref.parentElement!.style.display = "none"), { once: true });
    counter = slider.counter;
    Object.defineProperty(slider, "counter", {
      get: () => counter,
      set: val => (counter = val),
    });
    setTimeout(() => slider?.goTo(result.index), 0);
  });
});

function onKeyUp(e: KeyboardEvent) {
  if (!slider) return;
  if (e.key === "Escape") closeViewer();
  else if (e.key === "ArrowLeft") slider!.slidePrev();
  else if (e.key === "ArrowRight") slider!.slideNext();
}

async function closeViewer() {
  await mixin.close(con, ref);
  photos = [];
  ref.parentElement!.style.display = "block";
  slider?.goTo(0);
  slider?.destroy();
  slider = undefined;
  window.removeEventListener("keyup", onKeyUp);
}
</script>
