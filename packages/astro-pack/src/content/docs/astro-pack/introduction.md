---
title: Astro - Installation
description: Learn how to get started with @matb85/astro-pack.
sidebar:
  order: 1
---

### 1. Installation

Use your favorite package manager to install the package:

```bash
$ npm i @matb85/astro-pack
```

### 2. Astro setup

Add the astroPack integration to your Astro config file:

```ts
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { astroPack } from "@matb85/astro-pack/integration";

// https://astro.build/config
export default defineConfig({
  integrations: [
    astroPack({
      formats: {
        thumbnail: /min_|thumbnail_/,
        2400: '',
        1920: 'fhd_',
        1290: 'hd_',
        720: 'wvga_',
        480: 'hvga_'
      },
      enlarged: [1290, 1920]
    }),
    // other integrations...
  ],
});
```

Parameters:

- `formats`: Object with the keys being the desired width and the values being the prefix to be added to the image name.
- `enlarged`: Array with the desired widths for the enlarged images.

### 3. Photo and PhotoViewer

Import styles and PhotoViewer once, preferably in the layout file:

```astro
// layout.astro
---
import "@matb85/base-pack/dist/index.css"; // or your custom styles
import PhotoViewer from '@matb85/astro-pack/PhotoViewer.astro';
---

<PhotoViewer/>
```

Use the Photo component everywhere you need an image:

```astro
// your-component.astro

---
import Photo from '@matb85/astro-pack/Photo.astro';
---

<Photo src="/thumbnail_mountains.jpg" sizes={[1290]} className="your-class" group="mountains" alt="Portrait of a bird" />
<Photo src="/thumbnail_gorge.jpg" sizes={[480, 720]} className="your-class" group="mountains" alt="Dunajec Gorge" />
```

### 4. PhotoMultiViewer 

Use the PhotoMultiViewer component to display full screen image sliders:

```astro
// layout.astro

---
import "modular-slider/modular-slider.css"; // PhotoMultiViewer needs modular-slider styles
import PhotoMultiViewer from '@matb85/astro-pack/PhotoMultiViewer.astro';
---
  
<PhotoMultiViewer/>
```


### 5. Map

Use the PhotoMultiViewer component to display full screen image sliders:

```astro
// YourMapComponent.astro

<section id="map" class="your-map-class" data-observerhandler="map"></section>

<script lang="ts">
import { mapUtil, type MapCallbackT } from "@matb85/base-pack";

const map = document.getElementById("map") as HTMLElement;

const callback: MapCallbackT = (map: HTMLElement) => {
  // The Goole Maps script has been loaded
}

mutations.addHandler(store, {
  name: "map",
  handler: () => mapUtil(apikey, callback, map),
});

store.observer.observe(map);
</script>
  ```
