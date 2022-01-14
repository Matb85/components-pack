import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const format = "es";
const name = "sveltepack";
const input = "components/index.js";
const external = ["@matb85/base-pack", "svelte"];

const plugins = [resolve({ browser: true, dedupe: external }), commonjs()];

export default [
  {
    input,
    output: { format, name, file: "dist/index.js" },
    external,
    plugins: [svelte({ compilerOptions: { dev: false } }), ...plugins],
  },
  {
    input,
    output: { format, name, file: "dist/index.bundle.js" },
    plugins: [svelte({ compilerOptions: { dev: false } }), resolve({ browser: true, dedupe: external }), commonjs()],
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
