import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";

const format = "es";
const name = "sveltepack";
const input = "components/index.js";
const external = ["@matb85/base-pack", "svelte"];

const plugins = [resolve({ browser: true, dedupe: external }), commonjs(), css({ output: "index.css" })];

export default [
  {
    input,
    output: { format, name, file: "dist/index.js" },
    external,
    plugins: [svelte({ compilerOptions: { dev: false } }), ...plugins],
  },
  {
    input,
    output: { format, name, file: "dist/index.ssr.js" },
    external,
    plugins: [
      svelte({
        compilerOptions: {
          dev: false,
          generate: "ssr",
          hydratable: true,
        },
      }),
      ...plugins,
    ],
  },
];
