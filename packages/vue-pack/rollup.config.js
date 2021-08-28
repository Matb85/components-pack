import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";

export default {
  input: "src/index.js",
  output: {
    format: "umd",
    file: "dist/index.js",
    name: "vuepack",
    exports: "named",
    globals: { vue: "vue" },
  },
  external: ["vue"],
  plugins: [
    vue({
      css: false,
      template: {
        isProduction: true,
        compilerOptions: { whitespace: "condense" },
      },
    }),
    commonjs(),
    resolve({ browser: true, dedupe: ["@matb85/base-pack"] }),
    css({ output: "index.css" }),
  ],
};
