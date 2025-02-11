import App from "./App.svelte";
import "modular-slider/modular-slider.css";
import "@matb85/base-pack/dist/index.css";
import { mount } from "svelte";

let app = mount(App, {
  target: document.body,
});

export default app;
