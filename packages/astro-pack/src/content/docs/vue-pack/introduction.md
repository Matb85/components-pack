---
title: Vue - Installation
description: Learn how to get started with @matb85/vue-pack.
sidebar:
  order: 1
---

## Installation

Use your favorite package manager to install the package:

```bash
$ npm i @matb85/vue-pack
```

## Nuxt 3 setup

Create a pinia store:

```ts
// store/store.ts
import { defineNuxtPlugin } from "#app";
import { useMainStore } from "@/store/index";
import { useVuePackStore } from "@matb85/vue-pack";
import type { GlobalConfigI } from "@matb85/base-pack";

export default defineNuxtPlugin(async (nuxtApp) => {
  const vuepack = useVuePackStore(nuxtApp.$pinia);
  const main = useMainStore(nuxtApp.$pinia);

  vuepack.setSizes({
    formats: {
      thumbnail: /min_|thumbnail_/,
      2400: "qhd_",
      1920: "fhd_",
      1290: "hd_",
      720: "wvga_",
      480: "hvga_",
    },
    enlarged: [1290, 1920],
  } as GlobalConfigI);
  
  await main.init();
});
```

Edit nuxt.config.ts:

```ts
// nuxt.config.ts

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: { transpile: ["@matb85/vue-pack"] },
  modules: ["@pinia/nuxt"],
  plugins: ["~/plugins/store"],
});
```

Add configuration in your main layout file:

```vue
// layouts/default.vue
<script setup lang="ts">
  import { useVuePackStore } from "@matb85/vue-pack";

  const vuepack = useVuePackStore();
  onBeforeMount(() => vuepack.initStore());
</script>
```

Visit [Configuration Reference](/components-pack/start/prepare-images/) to see how to specify `formats` and `enlarged` sizes.