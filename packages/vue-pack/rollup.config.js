import vue from "rollup-plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.ts",
  output: {
    format: "umd",
    file: "dist/vuepack.js",
    name: "vuepack",
    globals: {
      vue: "Vue",
    },
  },
  external: ["vue"],
  plugins: [
    vue({
      css: false,
      template: {
        isProduction: true,
        compilerOptions: {
          whitespace: "condense",
        },
      },
    }),
    commonjs(),
    resolve(),
    replace({ "process.env.VUE_APP_TRANSITION_DUR": 400, preventAssignment: true }),
  ],
};
