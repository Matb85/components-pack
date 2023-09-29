<template>
  <section ref="root" class="MP-multi-viewer MP-viewer MS-wrapper">
    <div aria-hidden="true" class="first-slide">
      <img ref="photo" class="viewed-photo" />
    </div>
    <div class="photo-slider MS-con" id="photo-slider">
      <img
        v-for="img of imgs"
        :key="img.src"
        class="other-slide MS-lazy"
        :src="img.src"
        :data-srcset="img.srcset"
        :alt="img.alt || 'zdjęcie bez podpisu'"
      />
    </div>
    <!-- navigation -->
    <button aria-label="Poprzednie zdjęcie" id="multi-viewer-prev" @click="() => slider?.slidePrev()">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <button aria-label="Kolejne zdjęcie" id="multi-viewer-next" @click="() => slider?.slideNext()">
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24">
        <path :d="svgPath" />
      </svg>
    </button>
    <div class="MP-viewer_navbar">
      <p v-if="slider != false">
        {{ Math.abs(counter) + 1 }}/{{ imgs.length }}
        {{ imgs[Math.abs(counter)] && imgs[Math.abs(counter)].alt ? " | " + imgs[Math.abs(counter)].alt : "" }}
      </p>
      <button
        aria-label="Zamknij podgląd"
        title="Zamknij podgląd"
        @click="closeviewer"
        id="close-multi-viewer"
      ></button>
    </div>
  </section>
</template>

<script setup>
import { mixin } from "@matb85/base-pack";
import { onMounted, ref } from "vue";
import { setup, SlideHandler, NoLoop, lazyloading } from "modular-slider";
import { useVuePackStore } from "../../../src/index";

const Slider = setup(SlideHandler, NoLoop);

const store = useVuePackStore();
const GlobalConfig = store.vuepacksizes;
console.log(GlobalConfig);
const photo = ref(null);
const root = ref(null);

const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";
const trigger = "vuepack-enlargemanyphotos";
const imgs = ref([]);
let slider = null;
const counter = ref(0);
let base;
onMounted(async () => {
  base = new mixin(photo.value, root.value, GlobalConfig);
  window.addEventListener(trigger, async ({ detail: { img, rect } }) => {
    window.addEventListener("keyup", onKeyUp);

    const result = base.setupImgs(store.state, img);
    imgs.value = result.photos;

    await base.mounted({ img, rect });
    slider = new Slider({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [lazyloading()],
    });
    const chosen = slider.container.children[result.index];
    store.state.handlers.photo(chosen);

    photo.value.addEventListener("animationend", () => (photo.value.parentElement.style.display = "none"));
    counter.value = slider.counter;
    Object.defineProperty(slider, "counter", {
      get: () => counter.value,
      set: val => (counter.value = val),
    });
    setTimeout(() => slider.goTo(result.index), 0);
  });
});
async function closeviewer() {
  await base.close(photo.value, root.value);
  imgs.value = [];
  photo.value.parentElement.style.display = "block";
  if (!slider) return;
  slider.slideTo(0);
  slider.destroy();
  slider = false;
  window.removeEventListener("keyup", onKeyUp);
}
function onKeyUp(e) {
  if (!slider) return;
  if (e.key == "Escape") closeviewer();
  else if (e.key == "ArrowLeft") slider.slidePrev();
  else if (e.key == "ArrowRight") slider.slideNext();
}
</script>
