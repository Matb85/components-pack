import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// https://vitejs.dev/config/
const name = "vuepack";
const entry = process.cwd() + "/src/index.ts";
const external = ["@matb85/base-pack"];
const dedupe = [...external, "svelte"];

export default defineConfig({
  plugins: [vue()],
  resolve: { dedupe },
  build: {
    rollupOptions: { external },
    lib: {
      entry,
      name,
      formats: ["esm"],
    },
    outDir: "dist",
  },
});
