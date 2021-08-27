import App from "./App.svelte";
import "@matb85/base-pack/dist/index.css";
import "@matb85/base-pack/dist/navbar.css";
import "@matb85/base-pack/dist/footer.css";

let app = new App({
  target: document.body,
});

export default app;
