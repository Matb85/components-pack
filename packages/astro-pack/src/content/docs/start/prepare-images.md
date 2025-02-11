---
title: Configuration
description: Learn how to get started with Components Pack.
---

Components Pack assumes that each image is stored in **multiple sizes**, with each size having a **prefix** that corresponds to its width.

For example, if you have an image `my-image.jpg` and you have the following sizes:

- `qhd_my-image.jpg` (2400px)
- `fhd_my-image.jpg` (1920px)
- `hd_my-image.jpg` (1290px)
- `wvga_my-image.jpg` (720px)
- `hvga_my-image.jpg` (480px)
- `thumbnail_my-image.jpg` (30px)

The Components Pack config is an object with two keys:

- `formats`: Object with the keys being the desired width and the values being the prefix to be added to the image name.
- `enlarged`: tells components pack what sizes to use when displaying images full screen in PhotoViewers

```ts
// index.ts
import { GlobalConfigI } from "@matb85/base-pack";

const config: GlobalConfigI = {
  formats: {
    thumbnail: /min_|thumbnail_/, // thumbnail is a required key
      1920: 'xlarge_', // other keys are numbers with string or Regexp values
      1290: 'large',
      720: 'small_',
  },
  enlarged: [1290, 1920]
}
```