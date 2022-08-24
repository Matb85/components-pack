<template>
  <div ref="root" class="medium-pack-photo" @click="enlarge" role="button">
    <img
      ref="img"
      :src="src"
      :data-src="src"
      :data-srcset="genSrcset"
      :data-enlargedsrcset="enlargedsrcset"
      :sizes="genSizes"
      :alt="alt"
      :data-group="group"
      data-observerhandler="photo"
    />
    <span class="cross"></span>
  </div>
</template>

<script setup>
import { photo } from "@matb85/base-pack";
import { watch, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

const img = ref(null);
const root = ref(null);

const props = defineProps({
  src: String,
  alt: String,
  sizes: [Array, Object],
  dontenlargeonclick: String,
  dontaddtolist: String,
  multiview: String,
  group: String,
});

function enlarge() {
  if (!img.value.classList.contains("loaded") || typeof props.dontenlargeonclick !== "undefined") return;
  const enlarger = typeof props.multiview === "undefined" ? "vuepack-enlargephoto" : "vuepack-enlargemanyphotos";
  window.dispatchEvent(
    new CustomEvent(enlarger, { detail: { rect: root.value.getBoundingClientRect(), img: img.value } })
  );
}

/** @type {import('@matb85/base-pack').StoreDataI}  */
const GlobalConfig = store.state.vuepacksizes;
const settings = photo(props.src, GlobalConfig.formats, props.sizes);
const genSrcset = ref(settings.genSrcset);
const genSizes = ref(settings.genSrcset);
const enlargedsrcset = ref(photo(props.src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset);

watch(
  () => props.src,
  () => {
    genSrcset.value = photo(props.src, store.state.vuepacksizes.formats, props.sizes).genSrcset;
    if (img.value.classList.contains("loaded")) img.value.srcset = genSrcset;
  }
);

onMounted(() => {
  if (typeof dontaddtolist === "undefined")
    img.value.addEventListener(
      "load",
      () =>
        store.commit("vuepack/addphoto", {
          src: props.src,
          srcset: enlargedsrcset,
          ratio: img.value.naturalWidth / img.value.naturalHeight,
          group: props.group,
          alt: props.alt,
        }),
      { once: true }
    );
  store.state.vuepack.observer.observe(img.value);
});
</script>
