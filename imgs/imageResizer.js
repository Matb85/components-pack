const sharp = require("sharp");
const fs = require("fs").promises;
const CWD = process.cwd();
const FIRST_FOLDER = CWD + "/packages/vue-pack/public/";
const SECOND_FOLDER = CWD + "/packages/svelte-pack/public/";
const THIRD_FOLDER = CWD + "/packages/astro-pack/public/";

const images = [
  { path: "/bird.jpg", name: "bird.jpg" },
  { path: "/mountains.jpg", name: "mountains.jpg" },
  { path: "/dunajecgorge.jpg", name: "gorge.jpg" },
  { path: "/sokolica.jpg", name: "sokolica.jpg" },
];

/** specify how to resize the images and how to name them */
/** assume that each photo has a 3/2 aspect ratio - of course it is not a requirement, just a reference  */
const specification = [
  { height: 20, prefix: "thumbnail_" }, // width: 30
  { height: 320, prefix: "hvga_" }, // width: 480
  { height: 480, prefix: "wvga_" }, // width: 720
  { height: 860, prefix: "hd_" }, // width: 1290
  { height: 1280, prefix: "fhd_" }, // width: 1920
  { height: 1600, prefix: "" }, // width: 2400 ~ similar to qhd - default
];

const defaults = {
  withoutEnlargement: true,
};

const allProcesses = [];
for (const img of images) {
  for (const spec of specification) {
    allProcesses.push(
      sharp(__dirname + img.path)
        .resize(Object.assign(defaults, spec))
        .toFile(FIRST_FOLDER + spec.prefix + img.name)
        .then(newFileInfo => console.log("Success", newFileInfo))
    );
  }
}

Promise.all(allProcesses).then(() => {
  fs.readdir(FIRST_FOLDER).then(files => {
    for (const file of files) {
      if (file[0] !== ".") {
        fs.copyFile(FIRST_FOLDER + file, SECOND_FOLDER + file).then(() => console.log("Successfully copied " + file));
        fs.copyFile(FIRST_FOLDER + file, THIRD_FOLDER + file).then(() => console.log("Successfully copied " + file));
      }
    }
  });
});
