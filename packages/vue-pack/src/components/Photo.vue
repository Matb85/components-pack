<template>
  <div ref="root" class="MP-photo" @click="enlarge" role="button">
    <img
      ref="img"
      :src="src"
      :data-src="src"
      :data-srcset="genSrcset"
      :data-minsrc="src"
      :sizes="genSizes"
      :alt="alt"
      :data-group="group"
      data-observerhandler="photo"
    />
  </div>
</template>

<script setup lang="ts">
import { photo, type GlobalConfigI } from "@matb85/base-pack";
import { watch, ref, onMounted } from "vue";
import { useVuePackStore } from "../piniaStore";

const store = useVuePackStore();

const img = ref(null);
const root = ref(null);

const props = defineProps<{
  src: string;
  alt: string;
  sizes: number[] | Record<number, number>;
  dontEnlargeOnClick?: string | undefined;
  dontAddToList?: string | undefined;
  multiview?: string | undefined;
  group: string;
}>();

function enlarge() {
  if (!img.value.classList.contains("loaded") || typeof props.dontEnlargeOnClick !== "undefined") return;
  const enlarger = typeof props.multiview === "undefined" ? "vuepack-enlargephoto" : "vuepack-enlargemanyphotos";
  window.dispatchEvent(
    new CustomEvent(enlarger, { detail: { rect: root.value.getBoundingClientRect(), img: img.value } })
  );
}

const GlobalConfig: GlobalConfigI = store.vuepacksizes;
const settings = photo(props.src, GlobalConfig.formats, props.sizes);
const genSrcset = ref(settings.genSrcset);
const genSizes = ref(settings.genSrcset);

watch(
  () => props.src,
  () => {
    if (typeof window == "undefined" || typeof img == "undefined") return;
    img.value.classList.remove("loaded");
    img.value.removeAttribute("srcset");
    img.value.addEventListener(
      "load",
      () => {
        genSrcset.value = photo(props.src, GlobalConfig.formats, props.sizes).genSrcset;
        dispatch();
      },
      { once: true }
    );
  }
);

function dispatch(observe = true) {
  if (typeof props.dontAddToList === "undefined")
    store.addPhoto({ src: props.src, srcset: props.src, group: props.group, alt: props.alt });
  if (observe) store.state.observer.observe(img.value);
}
onMounted(dispatch);
</script>
