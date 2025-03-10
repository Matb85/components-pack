---
title: Vue - Usage
description: Learn how to use @matb85/vue-pack.
sidebar:
  order: 2
---

### The base-pack Store

In Vue Pack, the base-pack store has to be imported before use:

```ts
import { useVuePackStore } from '@matb85/vue-pack';
const vuePackStore = useVuePackStore();
console.log(vuePackStore); // Here it is!
```

### 1. Photo and PhotoViewer

Import styles and PhotoViewer once, preferably in the layout file:

```vue
// layouts/default.vue
<template>
  <PhotoViewer/>
</template>

<script setup lang="ts">
  import "@matb85/base-pack/dist/index.css"; // or your custom styles
  import PhotoViewer from '@matb85/vue-pack/PhotoViewer.vue';
</script>
```

Use the Photo component everywhere you need an image:

```vue
// YourComponent.vue
<Photo src="/thumbnail_mountains.jpg" :sizes="[1290]" className="your-class" group="mountains" alt="Portrait of a bird" />
<Photo src="/thumbnail_gorge.jpg" :sizes="[480, 720]" className="your-class" group="mountains" alt="Dunajec Gorge" />

<script setup lang="ts">
  import Photo from '@matb85/vue-pack/Photo.vue';
</script>
```

### 2. PhotoMultiViewer 

Use the PhotoMultiViewer component to display full screen image sliders:

```svelte
// +layout.vue

<script setup lang="ts">
import "modular-slider/modular-slider.css"; // PhotoMultiViewer needs modular-slider styles
import PhotoMultiViewer from '@matb85/vue-pack/PhotoMultiViewer.vue';
</script>
  
<PhotoMultiViewer/>
```

### 3. Map

Use the Map component to efficiently load [Google Maps JS SDK](https://developers.google.com/maps/documentation/javascript):

```vue
// YourComponent.vue
  
<Map class="your-map-class" apikey="YOUR_API_KEY" :callback="mapCallback" />

<script setup lang="ts">
  import Map from '@matb85/vue-pack/Map.vue';
  import type { MapCallbackT } from '@matb85/base-pack';

  const mapCallback: MapCallbackT = (domMap: HTMLElement) => {
    // The Google Maps script has been loaded, the google object is available
    // The map is ready to be initialized
  };
</script>
```