/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const settings = require("../../build.settings.json");

const options = {
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.mjs",
  bundle: true,
  define: {
    VIEWER_TRANSITION_SPEED: settings.VIEWER_TRANSITION_SPEED + "",
  },
  format: "esm",
};

build(options)
  .catch(() => process.exit(1))
  .then(m => {
    console.log(m, "successfully transformed.");
    process.exit(0);
  });
