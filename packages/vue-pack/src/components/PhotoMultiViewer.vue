<template>
  <section ref="con" title="Podgląd wielu zdjęć" class="MP-multi-viewer MP-viewer MS-wrapper">
    <div aria-hidden="true" class="first-slide">
      <img ref="photo" class="viewed-photo" />
    </div>
    <div class="photo-slider MS-con" id="photo-slider">
      <img
        v-for="img of photos"
        :key="img.src"
        class="other-slide MS-lazy"
        :src="img.src"
        :data-srcset="img.srcset"
        :alt="img.alt || 'zdjęcie bez podpisu'"
        data-observerhandler="photo"
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
      <p v-if="slider">
        {{ Math.abs(counter) + 1 }}/{{ photos.length }}
        {{ photos[Math.abs(counter)] && photos[Math.abs(counter)].alt ? " | " + photos[Math.abs(counter)].alt : "" }}
      </p>
      <button title="Zamknij podgląd" @click="closeViewer" id="close-multi-viewer"></button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { mixin, type StorePhotoI } from "@matb85/base-pack";
import { onMounted, ref, useTemplateRef } from "vue";
import { lazyLoading, NoLoop, swipeHandler } from "modular-slider";
import { useVuePackStore } from "../piniaStore";

const store = useVuePackStore();
const GlobalConfig = store.vuepacksizes!;

const con = useTemplateRef<HTMLElement>("con");
const photo = useTemplateRef<HTMLImageElement>("photo");

const svgPath =
  "M.52 24a.5.52 0 01-.35-.9L10.8 12 .17.93a.5.52 0 11.7-.74l10.99 11.46c.19.2.19.54 0 .73L.88 23.84a.5.5 0 01-.36.16z";

const photos = ref<StorePhotoI[]>([]);
let slider = ref<NoLoop | undefined>(undefined);
const counter = ref(0);

onMounted(async () => {
  window.addEventListener("vuepack-enlargemanyphotos", async (e) => {
    const { detail } = e as CustomEvent;
    window.addEventListener("keyup", onKeyUp);

    const result = mixin.setupPhotos(store.state!, detail.img, GlobalConfig);
    photos.value = result.photos;
    await mixin.mounted(detail, con.value!, photo.value!, GlobalConfig);

    slider.value = new NoLoop({
      container: "photo-slider",
      transitionSpeed: 500,
      plugins: [swipeHandler(), lazyLoading()],
    });

    const chosen = slider.value.container.children[result.index];
    store.state!.handlers.photo(chosen as HTMLImageElement);

    const els = slider.value.container.querySelectorAll(".MS-lazy") as NodeListOf<HTMLImageElement>;
    els.forEach(img => store.state!.observer.observe(img));

    photo.value!.addEventListener("animationend", () => (photo.value!.parentElement!.style.display = "none"));
    counter.value = slider.value.counter;
    Object.defineProperty(slider.value, "counter", {
      get: () => counter.value,
      set: val => (counter.value = val),
    });
    setTimeout(() => slider.value?.goTo(result.index), 0);
  });
});

function onKeyUp(e: KeyboardEvent) {
  if (!slider) return;
  if (e.key == "Escape") closeViewer();
  else if (e.key == "ArrowLeft") slider.value!.slidePrev();
  else if (e.key == "ArrowRight") slider.value!.slideNext();
}

async function closeViewer() {
  await mixin.close(con.value!, photo.value!);
  photos.value = [];
  photo.value!.parentElement!.style.display = "block";
  slider.value?.goTo(0);
  slider.value?.destroy();
  slider.value = undefined;
  window.removeEventListener("keyup", onKeyUp);
}
</script>
