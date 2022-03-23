import settings from "../../build.settings.json";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.ts",
  output: {
    format: "es",
    file: "dist/index.mjs",
  },
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.VIEWER_TRANSITION_SPEED": settings.VIEWER_TRANSITION_SPEED,
    }),
    typescript(),
  ],
};
