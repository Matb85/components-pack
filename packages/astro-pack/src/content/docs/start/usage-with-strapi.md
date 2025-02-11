---
title: Usage with Strapi
description: Learn how to use Components Pack with Strapi.
---

[Components Packs](https://github.com/Matb85/components-pack) **works out of the box** with images provided by a [Strapi backend](https://strapi.io).

> Strapi is a headless CMS that allows you to create, manage and distribute content via a RESTful and GraphQL API.

If you don't use Strapi, you can still use Components Pack by [manually generating images](/components-pack/start/preparing-images/) in appropriate sizes and adding a prefix to the image name that corresponds to its width.

In Strapi, the user can define the sizes of the images that are generated:

> You can read directly how Strapi generates responsive images [here](https://docs.strapi.io/dev-docs/plugins/upload#responsive-images)

```js
// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      breakpoints: {
        qhd: 2400,
        fhd: 1920,
        hd: 1290,
        wvga: 720,
        hvga: 480,
        min: 30,
        // pre-defined sizes for the Strapi Admin
        large: 1000,
        medium: 750,
        small: 500,
        thumbnail: 250,
      },
    },
  },
});
```

Let's say you have a Strapi instance with the config above, and you upload `my-image.jpg`. Strapi will generate and store the following versions of the image:

- the **original** image: `my-image.jpg`
- a **qhd** version: `qhd_my-image.jpg` (2400px)
- a **fhd** version: `fhd_my-image.jpg` (1920px)
- a **hd** version: `hd_my-image.jpg` (1290px)
- a **wvga** version: `wvga_my-image.jpg` (720px)
- a **hvga** version: `hvga_my-image.jpg` (480px)
- a **min** version: `min_my-image.jpg` (30px)
- a **large** version: `large_my-image.jpg` (1000px)
- a **medium** version: `medium_my-image.jpg` (750px)
- a **small** version: `small_my-image.jpg` (500px)
- a **thumbnail** version: `thumbnail_my-image.jpg` (250px)

As you can see, each image is stored with a prefix that corresponds to its size. With this information, you can now configure Components Pack to use these images.

```ts
// index.ts
import { GlobalConfigI } from "@matb85/base-pack";

const config: GlobalConfigI = {
  formats: {
    thumbnail: /min_|thumbnail_/,
      2400: '',
      1920: 'fhd_',
      1290: 'hd_',
      720: 'wvga_',
      480: 'hvga_'
  },
  enlarged: [1920, 2400]
}
```