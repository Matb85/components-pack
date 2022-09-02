const settings = require("../../build.settings.json");
const tailwind = require("tailwindcss");
const postcssEnvFunction = require("postcss-env-function");
console.log(settings.VIEWER_TRANSITION_SPEED);

module.exports = {
  plugins: [
    tailwind(),
    postcssEnvFunction({
      importFrom: {
        environmentVariables: {
          "--viewer-transtion-speed": settings.VIEWER_TRANSITION_SPEED + "ms",
        },
      },
    }),
  ],
};
