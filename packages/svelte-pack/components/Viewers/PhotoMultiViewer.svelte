<section
  aria-label="Photo viewer"
  bind:this="{el}"
  class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
  <div aria-hidden="true" class="first-slide">
    <img bind:this="{image}" class="viewed-photo" alt="main" />
  </div>
  <div class="photo-slider ms-inner-con" id="photo-slider">
    {#each imgs as img}
      <div class="other-slides">
        <div
          class="medium-pack-photo no-hover"
          style="--enlarged-photo-w: {img.width}; --enlarged-photo-h: {img.height};">
          <img
            class="ms-lazy"
            src="{img.src}"
            data-srcset="{img.srcset}"
            alt="{img.alt || 'a photo with no alt text'}" />
        </div>
      </div>
    {/each}
  </div>
  <!-- navigation -->
  <button aria-label="previous photo" id="multi-viewer-prev">
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
      ><path d="{svgPath}"></path>
    </svg>
  </button>
  <button aria-label="next photo" id="multi-viewer-next">
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
      ><path d="{svgPath}"></path></svg>
  </button>
  <div class="medium-pack-photo-viewer-navbar">
    <p>
      {#if slider != false}{Math.abs(counter) + 1}/{imgs.length}
        {imgs[Math.abs(counter)] && imgs[Math.abs(counter)].alt ? " | " + imgs[Math.abs(counter)].alt : ""}
      {/if}
    </p>
    <button aria-label="close the viewer" on:click="{closeviewer}" id="close-multi-viewer"></button>
  </div>
</section>

<script>
import { mixin } from "@matb85/base-pack";
import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";
import { onMount } from "svelte";
const Slider = setup(Slidehandler, Noloop);
let image;
let el;
const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";
let imgs = [];
let slider;
let counter;
onMount(() => {
  const hander = mixin.mounted.bind({ ref: image, el, getdimensions: mixin.getdimensions });
  window.addEventListener("keyup", e => {
    if (!slider) return;
    switch (e.key) {
      case "Escape":
        closeviewer();
        break;
      case "ArrowLeft":
        slider.slideBy(-1);
        break;
      case "ArrowRight":
        slider.slideBy(1);
        break;
    }
  });
  window.addEventListener("enlargeManyPhotos", async ({ detail }) => {
    const result = mixin.setupimgs(window.sveltepack, detail.img);

    imgs = result.photos;
    await hander(detail);
    slider = new Slider({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [lazyloading(), buttons({ prevBtn: "#multi-viewer-prev", nextBtn: "#multi-viewer-next" })],
    });

    const chosen = slider.container.children[result.index].children[0].children[0];
    window.sveltepack.handlers.photo(chosen);
    slider.slideTo(result.index, 0);
    counter = slider.counter;
    Object.defineProperty(slider, "counter", {
      get: () => counter,
      set: val => (counter = val),
    });

    image.addEventListener("animationend", () => (image.parentElement.style.display = "none"), { once: true });
  });
});

async function closeviewer() {
  await mixin.close(image, el);
  imgs = [];
  image.parentElement.style.display = "block";
  if (!slider) return;
  slider.slideTo(0);
  slider.destroy();
  slider = false;
}
</script>
