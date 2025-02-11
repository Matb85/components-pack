---
title: Svelte - Usage
description: Learn how to use @matb85/svelte-pack.
sidebar:
  order: 2
---

### The base-pack Store

In Svelte Pack, the base-pack store is located at `window.sveltePack`

```ts
console.log(window.sveltePack); // Here it is!
```

### 1. Photo and PhotoViewer

Import styles and PhotoViewer once, preferably in the layout file:

```svelte
// +layout.svelte
<script lang="ts">
import "@matb85/base-pack/dist/index.css"; // or your custom styles
import PhotoViewer from '@matb85/svelte-pack/viewers/PhotoViewer.svelte';
</script>

<PhotoViewer/>
```

Use the Photo component everywhere you need an image:

```svelte
// YourComponent.svelte
<script lang="ts">
import Photo from '@matb85/svelte-pack/Photo.svelte';
</script>

<Photo src="/thumbnail_mountains.jpg" sizes={[1290]} className="your-class" group="mountains" alt="Portrait of a bird" />
<Photo src="/thumbnail_gorge.jpg" sizes={[480, 720]} className="your-class" group="mountains" alt="Dunajec Gorge" />
```

### 2. PhotoMultiViewer 

Use the PhotoMultiViewer component to display full screen image sliders:

```svelte
// +layout.svelte

<script lang="ts">
import "modular-slider/modular-slider.css"; // PhotoMultiViewer needs modular-slider styles
import PhotoMultiViewer from '@matb85/svelte-pack/viewers/PhotoMultiViewer.svelte';
</script>
  
<PhotoMultiViewer/>
```

### 3. Map

Use the Map component to efficiently load [Google Maps JS SDK](https://developers.google.com/maps/documentation/javascript):

```svelte
// YourComponent.svelte

<script lang="ts">
import Map from '@matb85/svelte-pack/Map.svelte';
import type { MapCallbackT } from '@matb85/base-pack';

const mapCallback: MapCallbackT = (domMap: HTMLElement) => {
    // The Goole Maps script has been loaded, the google object is available
    // The map is ready to be initialized
};
</script>
  
<Map class="your-map-class" apikey="YOUR_API_KEY" callback={mapCallback} />
```