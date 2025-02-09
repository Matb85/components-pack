import settings from "../../build.settings.json" with { type: "json" };
import tailwind from "tailwindcss";
import postcssEnvFunction from "postcss-env-function";

console.log(settings.VIEWER_TRANSITION_SPEED);

export default {
  plugins: [
    tailwind,
    postcssEnvFunction({
      importFrom: {
        environmentVariables: {
          "--viewer-transtion-speed": settings.VIEWER_TRANSITION_SPEED + "ms",
        },
      },
    }),
  ],
};
