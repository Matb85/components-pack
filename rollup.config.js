import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";
import strip from "@rollup/plugin-strip";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
//import babel from "@rollup/plugin-babel";
export default {
  input: "src/setup/index.ts",
  output: {
    format: "umd",
    file: "dist/photopack.js",
    name: "photopack",
    globals: {
      vue: "Vue",
    },
  },
  external: ["vue"],
  plugins: [
    // babel({
    //   exclude: "node_modules/**",
    //   runtimeHelpers: true,
    //   babelrc: false,
    //   presets: [["@babel/preset-env", { modules: false }]],
    // }),
    typescript(),
    vue({
      css: false,
      template: {
        isProduction: true,
        compilerOptions: {
          whitespace: "condense",
        },
      },
    }),
    scss({ sass: require("node-sass") }),
    commonjs(),
    resolve(),
    strip(),
    terser(),
  ],
};
