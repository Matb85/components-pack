import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "modular-slider/modular-slider.css";
import "@matb85/base-pack/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");
