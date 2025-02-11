---
title: Astro - Usage
description: Learn how to use @matb85/astro-pack.
sidebar:
  order: 2
---

### The base-pack Store

In Astro Pack, the base-pack store is located at `window.astroPack`

```ts
console.log(window.astroPack); // Here it is!
```

### 1. Photo and PhotoViewer

Import styles and PhotoViewer once, preferably in the layout file:

```astro
// layout.astro
---
import "@matb85/base-pack/dist/index.css"; // or your custom styles
import PhotoViewer from '@matb85/astro-pack/viewers/PhotoViewer.astro';
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

### 2. PhotoMultiViewer 

Use the PhotoMultiViewer component to display full screen image gallery:

```astro
// layout.astro

---
import "modular-slider/modular-slider.css"; // PhotoMultiViewer needs modular-slider styles
import PhotoMultiViewer from '@matb85/astro-pack/viewers/PhotoMultiViewer.astro';
---
  
<PhotoMultiViewer/>
```


### 3. Map

Use the mapUtil function to efficiently load [Google Maps JS SDK](https://developers.google.com/maps/documentation/javascript):

```astro
// YourMapComponent.astro

<section id="map" class="your-map-class" data-observerhandler="map"></section>

<script>
import { mapUtil, type MapCallbackT } from "@matb85/base-pack";

const map = document.getElementById("map") as HTMLElement;

const mapCallback: MapCallbackT = (domMap: HTMLElement) => {
    // The Goole Maps script has been loaded, the google object is available
    // The map is ready to be initialized
};

mutations.addHandler(store, {
  name: "map",
  handler: () => mapUtil(apikey, callback, map),
});

store.observer.observe(map);
</script>
  ```
