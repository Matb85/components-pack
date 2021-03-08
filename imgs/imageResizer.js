const sharp = require("sharp");

const images = [
  { path: "/bird.jpg", name: "bird.jpg" },
  { path: "/dunajecgorge.jpg", name: "gorge.jpg" },
];

/** specify how to resize the images and how to name them */
/** assume that each photo has a 3/2 aspect ratio */
const specification = [
  { height: 20, prefix: "thumbnail_" }, // width: 30
  { height: 320, prefix: "hvga_" }, // width: 480
  { height: 480, prefix: "wvga_" }, // width: 720
  { height: 860, prefix: "hd_" }, // width: 1290
  { height: 1280, prefix: "fhd_" }, // width: 1920
  { height: 1600, prefix: "" }, // width: 2400 ==> a bit smaller than qhd - default
];

for (const img of images) {
  for (const spec of specification) {
    sharp(__dirname + img.path)
      .resize(spec)
      .toFile("./src/assets/" + spec.prefix + img.name);
  }
}
