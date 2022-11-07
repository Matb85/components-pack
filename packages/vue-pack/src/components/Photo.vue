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
    if (typeof window == "undefined" || typeof img == "undefined") return;
    img.value.classList.remove("loaded");
    img.value.removeAttribute("srcset");
    img.value.addEventListener(
      "load",
      () => {
        enlargedsrcset.value = photo(props.src, GlobalConfig.formats, GlobalConfig.enlarged).genSrcset;
        genSrcset.value = photo(props.src, GlobalConfig.formats, props.sizes).genSrcset;
        dispatch();
      },
      { once: true }
    );
  }
);
function dispatch(observe = true) {
  if (typeof dontaddtolist === "undefined")
    store.commit("vuepack/addphoto", { src: props.src, srcset: enlargedsrcset, group: props.group, alt: props.alt });
  if (observe) store.state.vuepack.observer.observe(img.value);
}
onMounted(dispatch);
</script>
