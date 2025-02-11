---
title: Getting Started
description: Learn how to get started with @matb85/svelte-pack.
sidebar:
  order: 1
---

### 1. Installation

Use your favorite package manager to install the package:

```bash
$ npm i @matb85/svelte-pack
```

### 2. SvelteKit setup

Add configuration in your main layout file:

```svelte
// +layout.svelte
<script lang="ts">
	import { setContext } from 'svelte';
	import type { GlobalConfigI } from '@matb85/base-pack';

	const config: GlobalConfigI = {
		formats: {
			thumbnail: /min_|thumbnail_/,
			2400: 'qhd_',
			1920: 'fhd_',
			1290: 'hd_',
			720: 'wvga_',
			480: 'hvga_'
		},
		enlarged: [1290, 1920]
	};
	setContext('svelte-pack-sizes', config);
</script>
});
```

Parameters:

- `formats`: Object with the keys being the desired width and the values being the prefix to be added to the image name.
- `enlarged`: Array with the desired widths for the enlarged images.

### 3. Photo and PhotoViewer

Import styles and PhotoViewer once, preferably in the layout file:

```svelte
// +layout.svelte
<script lang="ts">
import "@matb85/base-pack/dist/index.css"; // or your custom styles
import PhotoViewer from '@matb85/astro-pack/viewers/PhotoViewer.svelte';
</script>

<PhotoViewer/>
```

Use the Photo component everywhere you need an image:

```svelte
// YourComponent.svelte
<script lang="ts">
import Photo from '@matb85/astro-pack/Photo.svelte';
</script>

<Photo src="/thumbnail_mountains.jpg" sizes={[1290]} className="your-class" group="mountains" alt="Portrait of a bird" />
<Photo src="/thumbnail_gorge.jpg" sizes={[480, 720]} className="your-class" group="mountains" alt="Dunajec Gorge" />
```

### 4. PhotoMultiViewer 

Use the PhotoMultiViewer component to display full screen image sliders:

```svelte
// +layout.svelte

<script lang="ts">
import "modular-slider/modular-slider.css"; // PhotoMultiViewer needs modular-slider styles
import PhotoMultiViewer from '@matb85/astro-pack/viewers/PhotoMultiViewer.svelte';
</script>
  
<PhotoMultiViewer/>
```

### 5. Map

Use the PhotoMultiViewer component to display full screen image sliders:

```svelte
// YourComponent.svelte

<script lang="ts">
import Map from '@matb85/svelte-pack/Map.svelte';
import type { MapCallbackT } from '@matb85/base-pack';

const mapCallback: MapCallbackT = (map: HTMLElement) => {
    // The Goole Maps script has been loaded
    // The map is ready to be initialized
    const center = { lat: 49.42, lng: 20.48 };
    const map = new google.maps.Map(domMap, {
        center,
        zoom: 16,
        streetViewControl: false,
        styles: [{ featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] }]
    });
    new google.maps.Marker({ position: center, map });
};
</script>
  
<Map class="your-map-class" apikey="YOUR_API_KEY" callback={mapCallback} />
```