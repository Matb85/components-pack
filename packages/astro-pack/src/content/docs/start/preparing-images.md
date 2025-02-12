---
title: Preparing Images
description: Learn how to prepare your images for Components Pack.
---

If you use **Strapi**, you can **skip** this step and go directly to the [Usage with Strapi](/components-pack/start/usage-with-strapi/) section.

Components Pack assumes that each image is stored in **multiple sizes**, with each size having a **prefix** that corresponds to its width.

You can use the following script to generate images in different sizes:

```ts
import sharp from 'sharp';

const CWD = process.cwd();
const FOLDER = process.cwd() + "/path/to/your/folder/";

const images = [
  "path/to/your/image1.jpg",
  "path/to/your/image2.jpg",
  // ...
];

/** specify how to resize the images and how to name them */
/** assume that each photo has a 3/2 aspect ratio - of course it is not a requirement  */
const specification = [
  { height: 20, prefix: "thumbnail_" }, // width: 30
  { height: 320, prefix: "hvga_" }, // width: 480
  { height: 480, prefix: "wvga_" }, // width: 720
  { height: 860, prefix: "hd_" }, // width: 1290
  { height: 1280, prefix: "fhd_" }, // width: 1920
  { height: 1600, prefix: "" }, // width: 2400 ~ similar to qhd - default, no prefix
];

const defaults = {
  withoutEnlargement: true,
};

// sharp will process all the images in all specifications
const allProcesses = [];
for (const img of images) {
  for (const spec of specification) {
    allProcesses.push(
      sharp(__dirname + img.path)
        // resize the image
        .resize(Object.assign(defaults, spec))
        // save to file
        .toFile(FOLDER + spec.prefix + img.name)
        // log the result
        .then(newFileInfo => console.log("Success", newFileInfo))
    );
  }
}
```

You can see this script in action [here](https://github.com/Matb85/components-pack/blob/master/imgs/imageResizer.js).