import App from "./App.svelte";
import "@matb85/base-pack/dist/index.css";
import "@matb85/base-pack/dist/navbar.css";
import { mount } from "svelte";

let app = mount(App, {
  target: document.body,
});

export default app;
