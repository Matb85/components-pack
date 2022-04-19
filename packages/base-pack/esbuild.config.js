/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const settings = require("../../build.settings.json");

const options = {
  entryPoints: ["./src/index.ts"],
  outdir: "./dist/",
  bundle: true,
  define: {
    "process.env.VIEWER_TRANSITION_SPEED": settings.VIEWER_TRANSITION_SPEED,
  },
  incremental: true,
};

build(options)
  .catch(() => process.exit(1))
  .then(m => {
    console.log(m, "successfully transformed.");
    process.exit(0);
  });
