import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import autoPreprocess from "svelte-preprocess";
import css from "rollup-plugin-css-only";

export default {
  input: "components/index.js",
  output: {
    format: "es",
    name: "sveltepack",
    file: "dist/sveltepack.js",
  },
  plugins: [
    svelte({
      preprocess: autoPreprocess(),
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    css({ output: "sveltepack.css" }),
  ],
};
