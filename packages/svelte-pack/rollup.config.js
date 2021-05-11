import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";

export default {
  input: "components/index.js",
  output: {
    format: "es",
    name: "sveltepack",
    file: "dist/index.js",
  },
  plugins: [svelte(), resolve({ browser: true, dedupe: ["svelte"] }), commonjs(), css({ output: "index.css" })],
};
