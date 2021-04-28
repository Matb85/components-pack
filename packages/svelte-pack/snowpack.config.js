/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: "../../",
  mount: {
    "./dev": "/",
    "./assets": "/assets",
    "./components": "/components",
  },
  plugins: ["@snowpack/plugin-svelte", "@snowpack/plugin-sass", "@snowpack/plugin-typescript"],
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
