---
title: Usage
description: Learn how to use @matb85/base-pack.
---

### Photo

Function used to generate `srcset` and `sizes` attributes for an image base on the given `GlobalConfigI` config.

```ts
import { photo, type GlobalConfigI } from "@matb85/base-pack";

const config: GlobalConfigI = {
  formats: {
    thumbnail: /min_|thumbnail_/,
    2400: "",
    1920: "fhd_",
    1290: "hd_",
    720: "wvga_",
    480: "hvga_",
  },
  enlarged: [1290, 1920],
};

const sizes = [480, 720, 1290];

const src = "min_your-photo.jpg";

const { genSrcset, genSizes } = photo(src, config.formats, sizes);
// genSrcset: "min_your-photo.jpg 480w, hvga_your-photo.jpg 720w, hd_your-photo.jpg 1290w"
// genSizes: "(max-width: 480px) 480px, (max-width: 720px) 720px, 1290px"
```

### Store

an object with an IntersectionObserver keeps a record of lazy loaded images and handles observed elements with provided handlers.

By default, store a one handler called "photo" that is used to lazy load photos. You can add your own handlers to the store using [mutations](#mutations).

```ts
import { createStore, type BasePackStoreI } from "@matb85/base-pack";

const store: BasePackStoreI = createStore();

store.observer.observe(document.getElementById("your-photo")!);

console.log(store.photolist, store.handlers);
```

Store implements BasePackStoreI interface which is a set of methods that can be used to manage photos:

```ts
interface BasePackStoreI {
  observer: IntersectionObserver;
  readonly handlers: Record<string, Handler>;
  readonly photolist: Record<string, StorePhotoI[]>;
}
```

- `observer` is an IntersectionObserver that is used to lazy load photos
- `handlers` is a set of functions that are triggered when an observed element is loaded
- `photolist` is a set of photos that are tracked by the store

When a tracked element is handled by the observer, the handler is triggered. The handler is selected based on the `data-observerhandler` attribute of the element.

```html
<div id="map" data-observerhandler="your-map-handler"></div>
```

### Mutations

Mutations is a set of functions that can be used to modify the store.

```ts
import { mutations, type StorePhotoI } from "@matb85/base-pack";

const storePhoto: StorePhotoI = {
  src: "your-photo.jpg",
  srcset: "your-photo.jpg",
  group: "your-group",
  alt: "your-alt",
};

mutations.addHandler(store, { name: "your-handler", handler: () => {} });

mutations.removeHandler(store, "your-handler");
```

Mutations contains a set of functions that can be used to modify the store:

```ts
interface MutationsI {
  addHandler(state: BasePackStoreI, { name, handler }: { name: string; handler: Handler });
  removeHandler(state: BasePackStoreI, name: string);
  addPhoto(state: BasePackStoreI, payload: StorePhotoI);
}
```

- `addPhoto` adds a photo to the store
- `addHandler` adds a handler to the store
- `removeHandler` removes a handler from the store

### Map

Utility functions for working with maps.

```html
<div id="your-map" data-observerhandler="your-map-handler"></div>
```

```ts
import { setUpGoogleMap, type MapCallbackT } from "@matb85/base-pack";

const map = document.getElementById("map") as HTMLElement;

const mapCallback: MapCallbackT = (domMap: HTMLElement) => {
  // The Google Maps script has been loaded, the google object is available
  // The map is ready to be initialized
};

setUpGoogleMap(apikey, callback, map, store);
```

Parameters:

- `apikey` - your Google Maps API key
- `callback` - a function that is called when the map is loaded
- `map` - the map element
- `store` - the base-pack store, usually `window.cpStore`

### Mixin

Mixin is an object used by both PhotoViewer and PhotoMultiViewer to manage photos.

```ts
import { mixin } from "@matb85/base-pack";

const img = document.getElementById("MP-viewer-viewed-photo") as HTMLImageElement;
```

Mixin contains methods for showing and hiding photos, as well as methods for preparing images before viewing.

```ts
interface MixinI {
  mounted(
    { img, rect }: EnlargeDataEvent,
    con: HTMLElement,
    ref: HTMLImageElement,
    config: GlobalConfigI
  ): Promise<void>;
  close(con: HTMLElement, ref: HTMLImageElement): Promise<void>;
  setupImgs(state: BasePackStoreI, img: HTMLImageElement, config: GlobalConfigI);
}
```

- `mounted` - animates the photo viewer when it is about to be viewed
- `close` - closes the photo viewer
- `setupImgs` prepares photos to be shown in PhotoMultiViewer
