/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  workspaceRoot: "../../",
  mount: {
    "./dev": "/",
    "./assets": { url: "/assets", static: true },
  },
  plugins: ["@morgul/snowpack-plugin-vue2"],
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
    open: "none",
  },
  buildOptions: {
    /* ... */
  },
};
