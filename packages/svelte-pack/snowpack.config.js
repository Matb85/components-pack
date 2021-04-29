/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: "../../",
  mount: {
    "./dev": "/",
    "./assets": { url: "/assets", static: true },
    "./components": "/components",
  },
  plugins: ["@snowpack/plugin-svelte"],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
