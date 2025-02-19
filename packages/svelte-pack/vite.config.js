import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
// https://vitejs.dev/config/
const name = "svelte-pack";
const entry = process.cwd() + "/components/index.ts";
const external = ["@matb85/base-pack"];
const dedupe = [...external, "svelte"];
export default defineConfig({
  plugins: [svelte()],
  resolve: { dedupe },
  build: {
    rollupOptions: { external },
    lib: {
      entry: entry,
      name,
      formats: ["es"],
    },
    outDir: "dist",
  },
});
