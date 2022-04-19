import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// https://vitejs.dev/config/
const name = "sveltepack";
const entry = process.cwd() + "/components/index.js";
const external = ["@matb85/base-pack"];
const dedupe = [...external, "svelte"];
export default defineConfig({
  publicDir: "assets",
  root: "./dev",
  plugins: [svelte()],
  build: {
    lib: {
      entry: entry,
      name,
      formats: ["es"],
    },
    outDir: process.cwd() + "/dist/",
  },
});
