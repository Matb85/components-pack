<template>
  <section bind:this="{el}" class="photo-multi-viewer photo-viewer ms-outer-con width-in-percentage">
    <div class="photo-slider ms-inner-con" id="photo-slider">
      <div class="first-slide">
        <img bind:this="{image}" class="viewed-photo" alt="main" />
      </div>
      {#each imgs as img}
        <div class="other-slides">
          <div class="wrapper">
            <div
              class="medium-pack-photo no-hover"
              style=" --enlarged-photo-w: {img.width}; --enlarged-photo-h: {img.height};">
              <img class="ms-lazy" src="{img.src}" data-srcset="{img.srcset}" alt="other" />
            </div>
          </div>
        </div>
      {/each}
    </div>
    <!-- navigation -->
    <button id="multi-viewer-prev">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path d="{svgPath}"></path>
      </svg>
    </button>
    <button id="multi-viewer-next">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
        ><path d="{svgPath}"></path></svg>
    </button>
    <button on:click="{closeviewer}" id="close-multi-viewer"></button>
  </section>
</template>

<script>
import { mixin } from "@matb85/base-pack";
import { setup, Slidehandler, Noloop, lazyloading, buttons } from "modular-slider";
import "modular-slider/dist/modular-slider.css";
import { onMount } from "svelte";
const Slider = setup(Slidehandler, Noloop);
let image;
let el;
const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";
let imgs = [];
let slider;

onMount(async () => {
  const hander = mixin.mounted.bind({ ref: image, el, getdimensions: mixin.getdimensions });
  window.addEventListener("enlargeManyPhotos", async ({ detail }) => {
    imgs = window.sveltepackstate.photolist[detail.img.dataset.group || "rest"].filter(x => {
      const { w, h } = mixin.getdimensions(x.ratio);
      x.width = w;
      x.height = h;
      return x.srcset !== detail.img.srcset;
    });
    await hander(detail);
    slider = new Slider({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [lazyloading(), buttons({ prevBtn: "#multi-viewer-prev", nextBtn: "#multi-viewer-next" })]
    });
  });
});

async function closeviewer() {
  await mixin.close(image, el);
  imgs = [];
  slider.slideTo(0);
  slider.destroy();
}
</script>
